const express = require('express');
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require("cors");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const bcrypt = require('bcrypt');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.NODE_ENV === 'production' ? 'https://hero-employee-management-aus.web.app' : 'http://localhost:5173',
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
 };

app.options("*", cors());
app.use(express.json());

const uri = `${process.env.mongodbUri}`

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

console.log(uri)

async function run() {
  try {
    // await client.connect();

    const userCollection = client.db("heroBD").collection("users");
    const workSheetCollection = client.db("heroBD").collection("works");
    const payrollCollection = client.db("heroBD").collection("payroll");
    const contactCollection = client.db("heroBD").collection("contact");

    app.post("/jwt", async (req, res) => {
      const user = req.body;
      const token = jwt.sign( { email: user.email, role: user.role }, 
        process.env.ACCESS_TOKEN_SECRET, 
        { expiresIn: '1h' });
      res.send({ token });
    });

    const verifyToken = (req, res, next) => {
      if (!req.headers.authorization) {
        return res.status(401).send({ message: "Unauthorized access" });
      };

      const token = req.headers.authorization?.split(' ')[1];
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).send({ message: "Token expired" });
        }
        req.user = decoded;
        next();
      });
    };

    const verifyAdmin = async (req, res, next) => {
      const email = req.user.email;
      const query = { email : email };
      const user = await userCollection.findOne(query);
      const isAdmin = user?.role === 'Admin';
      if(!isAdmin){
        return res.status(403).send({ message: 'Forbidden Access'});
      }
      next();
    };

    app.post('/login', async(req, res) => {
      const { email, password } = req.body;
      const user = await userCollection.findOne({ email });

      if (!user) {
        return res.status(401).send({ message: 'Invalid email or password' });
      }
    
      if (user.status === 'Fired') {
        return res.status(403).send({ message: 'Your account has been deactivated. Please contact the administrator.' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).send({ message: 'Invalid email or password' });
      }
    
      res.send(user);
    });

    app.post("/logout", async (req, res) => {
      const user = req.body;
      console.log("logging out", user);
      res.clearCookie("token", { ...cookieOptions, maxAge: 0 }).send({ success: true });
    });

    // users releted api
    app.get('/users', async(req, res) => {
      const result = await userCollection.find().toArray();
      res.send(result)
    });

    app.get('/users/role/:email', async (req, res) => {
      const email = req.params.email;
      const user = await userCollection.findOne({ email });
      res.send({ role: user?.role || 'Employee' });
    });
    
    // todo -hr
    app.get('/employee', async(req, res) => {
      const result = await userCollection.find({ role: 'Employee' }).toArray();
      res.send(result)
    });

    // todo -hr
    app.get('/employee/:slug', async (req, res) => {
      const { slug } = req.params;
      const employee = await userCollection.findOne({ email: slug });

      if (!employee) {
        return res.status(404).send({ message: 'Employee not found' });
      }
      
      const salaryHistory = await payrollCollection.find({ email: slug }).sort({ month: 1 }).toArray();
      res.send({ employee, salaryHistory });
    });

    app.get('/all-employee', verifyToken, verifyAdmin, async(req, res) => {
      const result = await userCollection.find({ isVerified: true, role: { $in: ["Employee", "HR"] } }).toArray();
      res.send(result)
    });

    app.post('/users', async(req, res) => {
      const user = req.body;
      const query = { email: user.email };
      const existingUser = await userCollection.findOne(query);
      if(existingUser){
        return res.send({message: 'user already exists', insertedId: null});
      };
      const result = await userCollection.insertOne(user);
      res.send(result);
    });

    app.get('/contact', async(req, res) => {
      const result = await contactCollection.find().toArray();
      res.send(result)
    });

    app.post('/contact', verifyToken, async (req, res) => {
      const user = req.body;
      const result = await contactCollection.insertOne(user);
      res.send(result)
    });

    app.get('/contact', async(req, res) => {
      const result = await contactCollection.find().toArray();
      res.send(result)
    });

    app.patch('/users/:id', async(req, res) => {
      const id = req.params.id;
      const { isVerified } = req.body;
      const filter = { _id: new ObjectId(id) }
      const updatedDoc = {
        $set: { isVerified: isVerified }
      }
      const result = await userCollection.updateOne(filter, updatedDoc)
      res.send(result);
    });

    app.patch('/employee/update-salary/:id', async (req, res) => {
      const id = req.params.id;
      const { salary } = req.body;
      const result = await userCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { salary : salary }}
      );
      res.send(result);
    });
    
    app.patch('/users/role/:id', verifyToken, verifyAdmin, async(req, res) => {
      const id = req.params.id;
      const result = await userCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { role: 'HR' }}
      );
      res.send(result);
    });
    
    app.patch('/users/fired/:id', verifyToken, verifyAdmin, async(req, res) => {
      const id = req.params.id;
      const result = await userCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { status: 'Fired' } }
      );
      res.send(result);
    });
    
    // Todo - hr
    app.get('/work-sheet', verifyToken, async(req, res) => {
      const result = await workSheetCollection.find().toArray();
      res.send(result);
    });

    app.get('/work-sheet/:email', verifyToken, async(req, res) => {
      const { email } = req.params;
      if (email !== req.user.email) {
        return res.status(403).send({ message: 'forbidden access' });
      }
      const result = await workSheetCollection.find({ "employee.email": email }).toArray();
      res.send(result);
    });

    app.post('/work-sheet', verifyToken, async(req, res) => {
      const work = req.body;
      const result = await workSheetCollection.insertOne(work);
      res.send(result)
    });

    app.patch('/work-sheet/:id', verifyToken, async (req, res) => {
      const item = req.body;
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) }
      const updatedDoc = {
        $set: {
          task: item.task,
          hoursWorked: item.hoursWorked,
          date: item.date,
        }
      }
      const result = await workSheetCollection.updateOne(filter, updatedDoc)
      res.send(result);
    });

    app.delete('/work-sheet/:id', verifyToken, async (req, res) => {
      const { id } = req.params;
      const result = await workSheetCollection.deleteOne({ _id: new ObjectId(id) });
      res.send(result);
    });

    app.get('/payroll', async(req, res) => {
      const result = await payrollCollection.find().toArray();
      res.send(result)
    });

    app.get('/payrolls', async (req, res) => {
      const { email, page = 1, limit = 5 } = req.query;
      const skip = (page - 1) * limit;
    
      const payrolls = await payrollCollection.find({ email }).sort({ month: 1 }) .skip(skip).limit(parseInt(limit)).toArray();
    
      const total = await payrollCollection.countDocuments({ email });
      res.send({ payrolls, total });
    });
    
    app.get('/payroll/:email', verifyToken, async(req, res) => {
      const { email } = req.params;
      if (email !== req.user.email) {
        return res.status(403).send({ message: 'forbidden access' });
      }
      const result = await payrollCollection.find({ "email": email }).toArray();
      res.send(result);
    });

    app.post('/payroll', verifyToken, async(req, res) => {
      const { name, email, salary, month } = req.body;

      // Check for duplicate payment
      const existingPayment = await payrollCollection.findOne({ email, month });
      if (existingPayment) {
        return res.status(400).json({ message: 'Payment for this period already exists.' });
      }

      const paymentData = { name, email, salary, month, paymentDate: null };
      const result = await payrollCollection.insertOne(paymentData);
      res.json({ success: true, insertedId: result.insertedId });
    });

    app.patch('/payroll/:id', verifyToken, verifyAdmin, async (req, res) => {
      const { id } = req.params;
      const { transactionId } = req.body;
    
      // Update the paymentDate and transactionId
      const paymentDate = new Date();
      const updatedDoc = {
        $set: {
          paymentDate,
          transactionId
        }
      };

      const result = await payrollCollection.updateOne({ _id: new ObjectId(id) }, updatedDoc);
      if (result.modifiedCount > 0) {
        res.json({ success: true });
      } else {
        res.status(400).json({ message: 'Payment update failed.' });
      }
    });

    app.post('/create-payment-intent', verifyToken, verifyAdmin, async(req, res) => {
      const { email, month, salary } = req.body;

      const totalSalary = salary * 100 // covert in poysha
    
      const { client_secret } = await stripe.paymentIntents.create({
        amount: totalSalary,
        currency: 'usd',
        automatic_payment_methods: {
          enabled: true,
        }
      });

      res.send({ clientSecret: client_secret });
    });

  } finally {}
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello! Welcome in Our Hero Employee Managment Server')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})