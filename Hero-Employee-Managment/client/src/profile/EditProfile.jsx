import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../auth/hook/useAuth';
import useAxiosSecure from '../auth/hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Spinner } from '@material-tailwind/react';
import toast from 'react-hot-toast';

const EditProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, setValue, watch } = useForm();
  const [imagePreview, setImagePreview] = useState(null);

  const { data: profile = {}, isLoading, refetch } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data } = await axiosSecure(`/users/${user?.email}`);
      return data;
    },
  });

  useEffect(() => {
    if (profile) {
      setValue("name", profile.name);
      setValue("designation", profile.designation);
      setValue("role", profile.role);
      setValue("salary", profile.salary);
      setValue("bank_account_no", profile.bank_account_no);
      setValue("image", profile.image);
      setImagePreview(profile.image);
    }
  }, [profile, setValue]);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axiosSecure.post("/upload", formData);
      setValue("image", response.data.url);
      setImagePreview(response.data.url);
    } catch (error) {
      console.error("Image upload failed", error);
      toast.error("Image upload failed");
    }
  };

  const onSubmit = async (data) => {
    try {
      await axiosSecure.put(`/users/${user?.email}`, data);
      refetch();
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile");
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen"> <Spinner /> </div>;
  }

  return (
    <div className="container mx-auto px-8 py-10 flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-5">Edit Profile</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
        <label className="text-gray-700">Full Name</label>
        <input {...register("name")} className="border p-2 rounded w-full" placeholder="Full Name" />
        
        <label className="text-gray-700">Designation</label>
        <select {...register("designation")} className="border p-2 rounded w-full">
          <option value="Web Developer">Web Developer</option>
          <option value="Graphics Designer">Graphics Designer</option>
          <option value="Digital Marketer">Digital Marketer</option>
          <option value="Sales Assistant">Sales Assistant</option>
          <option value="Social Media Executive">Social Media Executive</option>
        </select>
        
        <label className="text-gray-700">Role</label>
        <select {...register("role")} className="border p-2 rounded w-full">
          <option value="User">Employee</option>
          <option value="HR">HR</option>
        </select>
        
        <label className="text-gray-700">Salary</label>
        <input {...register("salary")} type="number" className="border p-2 rounded w-full" placeholder="Salary" />
        
        <label className="text-gray-700">Bank Account No</label>
        <input {...register("bank_account_no")} type="number" className="border p-2 rounded w-full" placeholder="Bank Account No" />
        
        <label className="text-gray-700">Profile Image</label>
        <input type="file" className="border p-2 rounded w-full" onChange={handleImageUpload} />
        {imagePreview && <img src={imagePreview} alt="Profile Preview" className="w-24 h-24 rounded-full mx-auto" />}
        
        <button type="submit" className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">Update Profile</button>
      </form>
    </div>
  );
};

export default EditProfile;
