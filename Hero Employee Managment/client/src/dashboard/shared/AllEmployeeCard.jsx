import React from 'react';
import { Card, Typography, CardBody, CardFooter, Dialog, DialogBody, DialogHeader, Input, Button, Spinner } from "@material-tailwind/react";

// bank_account_no
// designation
// email
// image
// isVerified
// name
// role
// salary
// status
// _id

const AllEmployeeCard = ({ allEmployee, isLoading, refetch, openModal, closeModal, handleUpdateHR, handleUpdateFired, onSubmit, isModalOpen, register, handleSubmit, errors }) => {

  if (isLoading) return <div className="flex items-center justify-center my-28"> <Spinner /> </div>

  console.log(allEmployee)
  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-4">
        {allEmployee.map(user => (
          <Card key={user._id} className="mt-6 flex flex-col justify-center items-center text-center">
            <CardBody>
            <img
              alt="employee image"
              src={user.image}
              class="relative inline-block h-10 w-10 cursor-pointer rounded-full object-cover object-center"
              data-popover-target="profile-menu"
            />
              <Typography variant="h5" color="blue-gray" className="mb-2">
                {user.name}
              </Typography>
              <Typography color="blue-gray" className="font-medium" textGradient>
                {user.designation}
              </Typography>
              <Typography>
                
              </Typography>
            </CardBody>
            <CardFooter className="grid grid-cols-3 gap-3 items-center justify-between pt-0">
              <Button  onClick={() => handleUpdateHR(user._id)} className={`py-1 px-2 ${user.role === "HR" ? "bg-blue-gray-200" : "bg-black"}`} disabled={user.role === "HR"} >
                {user.role === "HR" ? "HR" : "Make HR"}
              </Button>
              <Button  onClick={() => handleUpdateFired(user._id)} className={`py-1 ${user?.status ? 'bg-red-200' : 'bg-red-500'}`} disabled={user?.status} >
                {user?.status ? "Fired" : "Fire"}
              </Button>
              <Button  onClick={() => openModal(user)} className={`py-1 ${user.isVerified ? 'bg-green-500' : 'bg-red-200'}`} >
                Salary
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

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
    </div>
  );
};

export default AllEmployeeCard;