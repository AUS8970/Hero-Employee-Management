import React, { useState } from "react";
import { Card, Typography, Dialog, DialogBody, DialogHeader, Input, Button, Spinner } from "@material-tailwind/react";
import { useQuery } from '@tanstack/react-query'
import { useForm } from "react-hook-form";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../auth/hook/useAxiosSecure";

const EmployeeListTable = () => {
  const [ isModalOpen, setIsModalOpen ] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

  const { data: employee = [], isLoading, refetch } = useQuery({
    queryKey: ['employee'],
    queryFn: async () => {
      const { data } = await axiosSecure(`/employee`)
      return data;
    },
  });

  if (isLoading) return <div className="flex items-center justify-center my-28"> <Spinner /> </div>

  const openModal = (user) => {
    console.log(user)
    setValue('salary', user.salary);
    setValue('name', user.name);
    setValue('email', user.email);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    reset();
  };

  const handleUpdate = async (id, currentIsVerified) => {
    const updatedWork = {
      isVerified: !currentIsVerified,
    }

    const result = await axiosSecure.patch(`/users/${id}`, updatedWork);
    console.log(result.data)

    if(result.data?.modifiedCount > 0){
      toast.success("Status Update successful");
      refetch();
    }
  };

  const onSubmit = async (data) => {
    try{
      const paymentDetails = {
        name: data.name,
        email: data.email,
        salary: parseFloat(data.salary),
        month: data.month,
        paymentDate: null,
      };
      console.log(paymentDetails)
  
      const result = await axiosSecure.post("/payroll", paymentDetails);
      if (result.data.insertedId) {
        toast.success("Payment request successfully!");
        closeModal();
        reset();
      }
    } catch (err) {
      closeModal();
      toast.error("Sorry! Payment has already been requested for this month!");
    }
  }
  
  return (
    <Card className="max-w-4xl mx-auto h-full w-full">
      <table className="w-full table-auto text-left">
        <thead>
          <tr className="rounded-2xl">
            {["Name", "Email", "Status", "Bank Account No", "Salary", "Pay", "Details"].map((head) => (
              <th key={head} className="p-4 bg-gray-50">
                <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {employee?.map((user) => (
            <tr key={user?._id} className="font-montserrat">
              {/* Name */}
              <td className="p-4 border-b border-blue-gray-50">
                <Typography variant="small" color="blue-gray" className="font-normal "> {user.name} </Typography>
              </td>
              {/* Email */}
              <td className="p-4 border-b border-blue-gray-50">
                <Typography variant="small" color="blue-gray" className="font-normal"> {user.email} </Typography>
              </td>
              {/* Verified */}
              <td className="p-4 border-b border-blue-gray-50">
                <Button 
                  onClick={() => handleUpdate(user._id, user.isVerified)} 
                  className="p-1 bg-gray-200"
                >
                  {user.isVerified ? "✅" : "❌"}
                </Button>
              </td>
              {/* Bank Account */}
              <td className="p-4 border-b border-blue-gray-50">
                <Typography variant="small" color="blue-gray" className="font-normal"> {user.bank_account_no} </Typography>
              </td>
              {/* Salary */}
              <td className="p-4 border-b border-blue-gray-50">
                <Typography variant="small" color="blue-gray" className="font-normal"> {user.salary} </Typography>
              </td>
              {/* Pay */}
              <td className="p-4 border-b border-blue-gray-50">
                <Button 
                  onClick={() => openModal(user)}
                  className={`p-1 ${user.isVerified ? 'bg-green-500' : 'bg-red-200'}`} 
                  disabled={!user.isVerified}
                > 
                  Pay
                </Button>
              </td>
              {/* Details */}
              <td className="p-4 border-b border-blue-gray-50">
                <Link to={`/dashboard/details/${user.email}`}> 
                  <Typography variant="small" color="blue-gray" className="font-normal"> 
                    Details 
                  </Typography> 
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Dialog open={isModalOpen} handler={closeModal}>
        <DialogHeader> Pay </DialogHeader>
        <DialogBody>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full">
            <input type="hidden" {...register("name")} />
            <input type="hidden" {...register("email")} />
            {/* Salary */}
            <div className="">
              <Input label="Salary" type="number" readOnly
                {...register("salary", { required: "Please enter hours worked!" })}
              />
            </div>
            {/* Month */}
            <div className="">
              <Input 
                  label="Month & Year" 
                  type="month" 
                {...register("month", { required: "Month is required!" })} 
              />
              {errors.month && <span className="text-red-500 text-sm">{errors.month.message}</span>}
            </div>
            {/* Action */}
            <div className="flex w-full gap-3">
              <Button className="w-full" variant="gradient" color="red" onClick={closeModal}>
                Cancel
              </Button>
              <Button className="w-full" type="submit" variant="gradient" color="green">
                Pay Request
              </Button>
            </div>
          </form>
        </DialogBody>
      </Dialog>
    </Card>
  );
};

export default EmployeeListTable;