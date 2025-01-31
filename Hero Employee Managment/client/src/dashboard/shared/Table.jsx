import React, { useState } from "react";
import { PencilIcon } from "@heroicons/react/24/solid";
import { Card, Typography, IconButton, Tooltip, Dialog, DialogBody, DialogHeader, Input, Button, Spinner, Select, Option } from "@material-tailwind/react";
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from "../../auth/hook/useAxiosSecure";
import { Controller, useForm } from "react-hook-form";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { format } from "date-fns";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const MembersTable = ({ works, isLoading, refetch }) => {
  const [ isModalOpen, setIsModalOpen ] = useState(false);
  const [ editingWork, setEditingWork ] = useState(null);
  const [ date, setDate ] = useState(new Date());
  const { register, control, handleSubmit, reset, setValue, formState: { errors } } = useForm();
  const axiosSecure = useAxiosSecure();

  if (isLoading) return <div className="flex items-center justify-center my-28"> <Spinner /> </div>

  // const sortedWorks = works?.sort((a, b) => new Date(b.date) - new Date(a.date));

  const openModal = (work) => {
    setEditingWork(work);
    setValue('task', work.task);
    setValue('hoursWorked', work.hoursWorked);
    setDate(new Date(work.date));
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingWork(null);
    reset();
  };

  const handleUpdate = async (data) => {
    if (!editingWork) return;

    const updatedWork = {
      ...data,
      date: format(date, "yyyy-MM-dd"),
    };

    const result = await axiosSecure.patch(`/work-sheet/${editingWork._id}`, updatedWork);

    console.log(result.data)

    if(result.data.modifiedCount > 0){
      toast.success("Update successful");
      refetch();
      closeModal();
    }
  };

  const handleDelete = id => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/work-sheet/${id}`)
          .then(res => {
            if (res.data.deletedCount > 0) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
            }
          })
        }
      });
  }

  return (
    <Card className="container mx-auto h-full w-full">
      <table className="w-full table-auto text-left">
        <thead>
          <tr className="rounded-2xl">
            {["Tasks", "Hours Worked", "Date", "Edit", "Delete"].map((head) => (
              <th key={head} className="p-4 bg-gray-50">
                <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {works?.slice().reverse().map((work) => (
            <tr key={work?._id}>
              <td className="p-4 border-b border-blue-gray-50">
                <Typography variant="small" color="blue-gray" className="font-normal"> {work.task} </Typography>
              </td>
              <td className="p-4 border-b border-blue-gray-50">
                <Typography variant="small" color="blue-gray" className="font-normal">{work.hoursWorked}h</Typography>
              </td>
              <td className="p-4 border-b border-blue-gray-50">
              <Typography variant="small" color="blue-gray" className="font-normal">
                  {work.date ? format(work.date , "yyyy-MM-dd") : ""}
                </Typography>
              </td>
              <td className="p-4 border-b border-blue-gray-50">
                <Tooltip content="Edit">
                  <IconButton variant="text" onClick={() => openModal(work)}>
                    <PencilIcon className="h-4 w-4" />
                  </IconButton>
                </Tooltip>
              </td>
              <td className="p-4 border-b border-blue-gray-50">
                <Tooltip content="Delete">
                  <IconButton variant="text" onClick={() => handleDelete(work._id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </IconButton>
                </Tooltip>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Dialog open={isModalOpen} handler={closeModal}>
        <DialogHeader> Update Work Sheet </DialogHeader>
        <DialogBody>
          <form onSubmit={handleSubmit(handleUpdate)} className="flex flex-col items-center gap-4 w-full">
            {/* Tasks */}
            <div className="flex flex-col w-full">
              <Controller name="task" control={control}  rules={{ required: "Please select a task!" }}
                render={({ field }) => (
                  <Select {...field} label="Select Task">
                    <Option value="Sales">Sales</Option>
                    <Option value="Support">Support</Option>
                    <Option value="Content">Content</Option>
                    <Option value="Paper-work">Paper-work</Option>
                  </Select> 
                )}
              >
              </Controller>
              {errors.task && <span className="text-red-500 text-sm font-medium">{errors.hoursWorked.message}</span>}
            </div>
            {/* Worked Hours */}
            <div className="flex flex-col w-full">
              <Input label="Hours Worked" type="number"
                {...register("hoursWorked", { required: "Please enter hours worked!" })}
              />
              {errors.hoursWorked && <span className="text-red-500 text-sm font-medium">{errors.hoursWorked.message}</span>}
            </div>
            {/* Date */}
            <div className="flex flex-col w-full">
              <Input label="Date" type="date"
                date={date}
                value={format(date, "yyyy-MM-dd")}
                onChange={(e) => setDate(new Date(e.target.value))}
              />
            </div>
            {/* Action */}
            <div className="flex w-full gap-3">
              <Button className="w-full" variant="gradient" color="red" onClick={closeModal}>
                Cancel
              </Button>
              <Button className="w-full" type="submit" variant="gradient" color="green">
                Update
              </Button>
            </div>
          </form>
        </DialogBody>
      </Dialog>
    </Card>
  );
};

export default MembersTable;