import React from "react";
import { Card, Typography, Dialog, DialogBody, DialogHeader, Input, Button, Spinner } from "@material-tailwind/react";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const AllEmployeeListTable = ({ allEmployee, isLoading, refetch, openModal, closeModal, handleUpdateHR, handleUpdateFired, onSubmit, isModalOpen, register, handleSubmit, errors }) => {

  if (isLoading) return <div className="flex items-center justify-center my-28"> <Spinner /> </div>
  
  return (
    <Card className="max-w-5xl mx-auto h-full w-full mt-10">
      <table className="w-full table-auto text-left">
        <thead>
          <tr className="rounded-2xl">
            {["Name", "Designation", "Make HR", "Fire", "Adjust Salary" ].map((head) => (
              <th key={head} className="p-4 bg-gray-50">
                <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {allEmployee.map((user) => (
            <tr key={user?._id} className="font-montserrat">
              {/* Name */}
              <td className="p-4 border-b border-blue-gray-50">
                <Typography variant="small" color="blue-gray" className="font-normal "> {user.name} </Typography>
              </td>
              {/* Designation */}
              <td className="p-4 border-b border-blue-gray-50">
                <Typography variant="small" color="blue-gray" className="font-normal"> {user.designation} </Typography>
              </td>
              {/* Make HR */}
              <td className="p-4 border-b border-blue-gray-50">
                <Button 
                  onClick={() => handleUpdateHR(user._id)}
                  className={`py-1 px-2 ${user.role === "HR" ? "bg-blue-gray-200" : "bg-black"}`}
                  disabled={user.role === "HR"}
                >
                  {user.role === "HR" ? "HR" : "Make HR"}
                </Button>
              </td>
              {/* Fire */}
              <td className="p-4 border-b border-blue-gray-50">
                <Button 
                  onClick={() => handleUpdateFired(user._id)}
                  className={`py-1 px-2 ${user?.status ? 'bg-red-200' : 'bg-red-500'}`}
                  disabled={user?.status}
                >
                  {user?.status ? "Fired" : "Fire"}
                </Button>
              </td>
              {/* Adjust Salary */}
              <td className="p-4 border-b border-blue-gray-50">
                <Button 
                  onClick={() => openModal(user)}
                  className={`py-1 px-2 ${user.isVerified ? 'bg-green-500' : 'bg-red-200'}`} 
                >
                  Adjust Salary
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Dialog open={isModalOpen} handler={closeModal}>
        <DialogHeader> Adjust Salary </DialogHeader>
        <DialogBody>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full">
            {/* Adjust Salary */}
            <div className="space-y-5">
              <Input
                label="Current Salary"
                type="number"
                className=""
                readOnly
                {...register("currentSalary", { required: "Please! Make some salary adjustments." })}
              />
              <Input
                label="Adjust Salary"
                type="number"
                {...register("salary", { required: "Please! Make some salary adjustments." })}
              />
            </div>
            {/* Action */}
            <div className="flex w-full gap-3">
              <Button className="w-full" variant="gradient" color="red" onClick={closeModal}>
                Cancel
              </Button>
              <Button className="w-full" type="submit" variant="gradient" color="green">
                Update Adjust Salary
              </Button>
            </div>
          </form>
        </DialogBody>
      </Dialog>
    </Card>
  );
};

export default AllEmployeeListTable;