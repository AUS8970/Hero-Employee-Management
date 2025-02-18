import { Card, Input, Button, Typography, Select, Option } from "@material-tailwind/react";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hook/useAuth";
import useAxiosPublic from "../hook/useAxiosPublic";
import { AiOutlineMail } from "react-icons/ai";
import { CiImageOn, CiUser } from "react-icons/ci";
import { MdAccountBalance, MdAttachMoney } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import { toast } from 'react-hot-toast';
import SocialLogin from "../shared/SocialLogin";

const image_hosting_api = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`;

export function SimpleRegisterForm() {
  const axiosPublic = useAxiosPublic();
  const { handleSubmit, register, reset, control, formState: { errors } } = useForm();
  const { createUser, updateProfile } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (data) => {
    try {
      const imageFile = { image: data.image[0] };
      const res = await axiosPublic.post(image_hosting_api, imageFile, {
        headers: { 'content-type': 'multipart/form-data' }
      });

      if (res.data.success) {
        await createUser(data.email, data.password);
        await updateProfile(data.name, res.data.data.display_url);

        const userInfo = {
          name: data.name,
          email: data.email,
          designation: data.designation,
          salary: parseFloat(data.salary),
          bank_account_no: parseFloat(data.bank_account_no),
          role: data.role,
          image: res.data.data.display_url,
          isVerified: false,
        };

        const response = await axiosPublic.post("/users", userInfo);

        if (response.data.insertedId) {
          toast.success("Data Save Successful!");
          reset();
          navigate("/");
        };
      };
    } catch (error) {
      console.error(error);
      toast.error("An error occurred during registration.");
    }
  };

  return (
    <Card className="mt-24 flex mx-auto items-center" color="transparent" shadow={false}>
      <Typography className="text-4xl" variant="h4" color="blue-gray">
        Register
      </Typography>
      <Typography color="gray" className="mt-4 text-sm font-normal">
        Nice to meet you! Enter your details to register.
      </Typography>
      <SocialLogin />
      <form onSubmit={handleSubmit(handleSignup)} className="mb-2">
        <div className="mb-1 grid md:grid-cols-2 sm:grid-cols-1 gap-5 max-w-lg">
          {/* Name */}
          <div className="">
            <Input
              label="Name"
              placeholder="abdullah"
              {...register("name", { required: "Please enter your Name!" })}
              icon={<CiUser />}
            />
            {errors.name && <span className="text-red-500 font-medium">{errors.name.message}</span>}
          </div>

          {/* Email */}
          <div className="">
            <Input
              label="Email"
              placeholder="name@mail.com"
              {...register("email", { required: "Please enter your Email!" })}
              icon={<AiOutlineMail />}
            />
            {errors.email && <span className="text-red-500 font-medium">{errors.email.message}</span>}
          </div>

          {/* Role */}
          <div className="">
            <Controller
              name="role"
              control={control}
              defaultValue=""
              rules={{ required: "Please select your Role!" }}
              render={({ field }) => (
                <Select {...field} label="Your Role">
                  <Option value="HR">HR</Option>
                  <Option value="Employee">Employee</Option>
                </Select>
              )}
            />
            {errors.role && <span className="text-red-500 font-medium">{errors.role.message}</span>}
          </div>

          {/* Designation */}
          <div className="">
            <Controller
              name="designation"
              control={control}
              defaultValue=""
              rules={{ required: "Please select your Designation!" }}
              render={({ field }) => (
                <Select {...field} label="Your Designation">
                  <Option value="Web Developer">Web Developer</Option>
                  <Option value="Graphics Designer">Graphics Designer</Option>
                  <Option value="Digital Marketer">Digital Marketer</Option>
                  <Option value="Sales Assistant">Sales Assistant</Option>
                  <Option value="Social Media Executive">Social Media Executive</Option>
                </Select>
              )}
            />
            {errors.designation && <span className="text-red-500 font-medium">{errors.designation.message}</span>}
          </div>

          {/* Bank Account Number */}
          <div className="">
            <Input
              label="Bank Account Number"
              placeholder="1234567890"
              {...register("bank_account_no", { required: "Please enter your Bank Account Number!" })}
              icon={<MdAccountBalance />}
            />
            {errors.bank_account_no && <span className="text-red-500 font-medium">{errors.bank_account_no.message}</span>}
          </div>

          {/* Salary */}
          <div className="">
            <Input
              label="Salary"
              placeholder="123456"
              // value={selectedRole === "HR" ? "10000" : "5000"}
              // readOnly
              {...register("salary", { required: "Please enter your Salary!" })}
              icon={<MdAttachMoney />}
            />
            {errors.salary && <span className="text-red-500 font-medium">{errors.salary.message}</span>}
          </div>

          {/* Image */}
         <div className="">
          <Input
              label="Image"
              type="file"
              accept="image/*"
              {...register("image", { required: "Please upload your Profile Image!" })}
              icon={<CiImageOn />}
            />
            {errors.image && <span className="text-red-500 font-medium">{errors.image.message}</span>}
         </div>

          {/* Password */}
          <div className="">
            <Input
              label="Password"
              placeholder="******"
              type="password"
              {...register("password", { 
                required: true, 
                minLength: 6,
                maxLength: 15,
                pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/ })}
              icon={<TbLockPassword />}
            />
            {errors.password?.type === 'required' && <span className="text-red-500 font-medium"> Password is required. </span>}
            {errors.password?.type === 'minLength' && <span className="text-red-500 font-medium"> The password must be at least 6 characters long. </span>}
            {errors.password?.type === 'maxLength' && <span className="text-red-500 font-medium"> The password should not exceed 15 characters. </span>}
            {errors.password?.type === 'pattern' && <span className="text-red-500 font-medium"> Password must have one uppercase, one lower case, one number and one spacial characters. </span>}
            {/* {errors.password && <span className="text-red-500 font-medium">{errors.password.message}</span>} */}
          </div>
        </div>
        <Button type="submit" className="mt-6" fullWidth>
          Register
        </Button>
        <Typography color="gray" className="mt-4 text-center font-normal">
          Already have an account?{" "}
          <Link to={"/login"} className="font-medium text-gray-900">
            Login
          </Link>
        </Typography>
      </form>
    </Card>
  );
}
