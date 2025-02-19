import { Button, Input, Textarea } from '@material-tailwind/react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import useAxiosSecure from '../auth/hook/useAxiosSecure';
import { useForm } from 'react-hook-form';
import useAuth from '../auth/hook/useAuth';

const Contact = () => {

  const { handleSubmit, register, reset, control, formState: { errors } } = useForm();

  const axiosSecure = useAxiosSecure();

  const { user } = useAuth();

  const handleSignup = async (data) => {
    try {
      const messageInfo = {
        name: data.name,
        email: data.email,
        message: data.message,
        image: user?.photoURL
      };

      const response = await axiosSecure.post("/contact", messageInfo);

      if (response.data.insertedId) {
        toast.success("Message Send Successful!");
        reset();
      }

      reset();
    } catch (error) {
      console.error(error);
      toast.error("An error occurred during registration.");
    }
  };

  return (
    <div className="py-20">
      <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Contact us</h2>
        <p className="mb-4">
          For further questions, including partnership opportunities, please email hello@creative-tim.com or contact using our contact form.
        </p>
        <form onSubmit={handleSubmit(handleSignup)} className="mb-2">
          <div className="mb-1 grid grid-cols-1 gap-5 max-w-lg">
            {/* Name */}
            <div className="">
              <Input
                label="Name"
                defaultValue={user?.displayName}
                placeholder="abdullah"
                {...register("name", { required: "Please enter your Name!" })}
              />
              {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
            </div>

            {/* Email */}
            <div className="">
              <Input
                label="Email"
                defaultValue={user?.email}
                placeholder="name@mail.com"
                {...register("email", { required: "Please enter your Email!" })}
              />
              {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
            </div>

            {/* Message */}
            <div className="">
              <Textarea
                label="Message"
                {...register("message", { required: "Please enter your Message!" })}
              />
              {errors.message && <span className="text-red-500 text-xs">{errors.message.message}</span>}
            </div>
          </div>
          <Button type="submit" className="mt-6" fullWidth>
            Send Message
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Contact;