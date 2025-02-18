import { Button, Input, Textarea } from '@material-tailwind/react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import useAxiosSecure from '../auth/hook/useAxiosSecure';
import { useForm } from 'react-hook-form';

const Contact = () => {

  const { handleSubmit, register, reset, control, formState: { errors } } = useForm();

  const axiosSecure = useAxiosSecure();

  const handleSignup = async (data) => {
    try {
      const messageInfo = {
        name: data.name,
        email: data.email,
        message: data.message,
      };

      const response = await axiosSecure.post("/contact", messageInfo);

      if (response.data.insertedId) {
        toast.success("Data Save Successful!");
        reset();
      }

      reset();
    } catch (error) {
      console.error(error);
      toast.error("An error occurred during registration.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
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
              placeholder="abdullah"
              {...register("name", { required: "Please enter your Name!" })}
            />
            {errors.name && <span className="text-red-500 font-medium">{errors.name.message}</span>}
          </div>

          {/* Email */}
          <div className="">
            <Input
              label="Email"
              placeholder="name@mail.com"
              {...register("email", { required: "Please enter your Email!" })}
            />
            {errors.email && <span className="text-red-500 font-medium">{errors.email.message}</span>}
          </div>

          {/* Message */}
          <div className="">
            <Textarea
              label="Message"
              {...register("message", { required: "Please enter your Bank Account Number!" })}
            />
            {errors.message && <span className="text-red-500 font-medium">{errors.message.message}</span>}
          </div>
        </div>
        <Button type="submit" className="mt-6" fullWidth>
          Send Message
        </Button>
      </form>
    </div>
  );
};

export default Contact;