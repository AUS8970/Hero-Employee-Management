import { Card, Input, Checkbox, Button, Typography } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hook/useAuth";
import toast from "react-hot-toast";
import SocialLogin from "../shared/SocialLogin";
 
export function SimpleLoginForm() {

  const { logIn } = useAuth();

  const { register, reset, formState: { errors } } = useForm();

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleLogIn = async (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    logIn(email, password)
    .then((result) => {
      const user = result.user;
      console.log(user)
      reset();
      toast.success("Login Seccessfull!")
      navigate(from, {replace: true})
    })
    .catch(error => {
      toast.error(error.message || 'Login failed');
    });
  }

  return (
     <Card className="mt-24 flex mx-auto items-center" color="transparent" shadow={false}>
      <Typography className="text-4xl" variant="h4" color="blue-gray">
        Log In
      </Typography>
      <Typography color="gray" className="mt-4 text-sm font-normal">
        Welcome Back! Enter your email and password.
      </Typography>
      <SocialLogin />
      <form onSubmit={handleLogIn} className="mb-2 w-80 max-w-screen-lg sm:w-96">
        <div className="mb-1 flex flex-col gap-6">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Your Email
          </Typography>
          <Input
            size="lg"
            {...register("email", { required: true })}
            placeholder="name@mail.com"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          {errors.email && <span className="text-red-500 font-medium"> Please enter your email! </span>}
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Password
          </Typography>
          <Input
            type="password"
            {...register("password", { required: true })}
            size="lg"
            placeholder="********"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          {errors.password && <span className="text-red-500 font-medium"> Please enter your password! </span>}
        </div>
        <Button type="submit" className="mt-6" fullWidth>
          Login
        </Button>
        <Typography color="gray" className="mt-4 text-center font-normal">
          Don't have an account?{" "}
          <Link to={'/register'} className="font-medium text-gray-900">
            Register
          </Link>
        </Typography>
      </form>
    </Card>
  );
}