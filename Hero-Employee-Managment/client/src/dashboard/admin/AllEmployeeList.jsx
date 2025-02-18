import React, { useState } from 'react';
import AllEmployeeListTable from '../shared/AllEmployeeListTable';
import AllEmployeeCard from '../shared/AllEmployeeCard';
import useAxiosSecure from '../../auth/hook/useAxiosSecure';
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Button, Spinner, Typography } from '@material-tailwind/react';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const EmployeeList = () => {
  const [viewMode, setViewMode] = useState('table');
  const [ isModalOpen, setIsModalOpen ] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  const { data: allEmployee = {}, isLoading, refetch } = useQuery({
    queryKey: ['all-employee'],
    queryFn: async () => {
      const { data } = await axiosSecure(`/all-employee`);
      return data;
    },
  });

  if (isLoading) return <div className="flex items-center justify-center my-28"> <Spinner /> </div>

  const openModal = (user) => {
    console.log(user);
    setValue('_id', user._id);
    setValue('currentSalary', user.salary);
    setValue('salary', user.salary);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleUpdateHR = async (id) => {
    const updatedWork = {
      role: 'HR',
    }
    const result = await axiosSecure.patch(`/users/role/${id}`, updatedWork);
    console.log(result.data)

    if(result.data.modifiedCount > 0){
      toast.success("Make HR successful");
      refetch();
    }
  };
  
  const handleUpdateFired = async (id) => {
    const updatedWork = { status: 'Fired' }
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Fire it!"
    }).then( async (result) => {
      if (result.isConfirmed) {
        const result = await axiosSecure.patch(`/users/fired/${id}`, updatedWork);
        if(result.data.modifiedCount > 0){
          refetch();
          Swal.fire({ title: "Fired!", text: "This user has been fired.", icon: "success" });
        }}
    });
  };

  const onSubmit = async (data) => {
    try{
      const currentSalary = parseFloat(data.currentSalary);
      const newSalary = parseFloat(data.salary);

      if (newSalary <= currentSalary) {
        closeModal();
        toast.error("New salary must be greater than the current salary.");
        return;
      }

      const updatedSalary = { salary: newSalary };
      const result = await axiosSecure.patch(`/employee/update-salary/${data._id}`, updatedSalary);
      if (result.data.modifiedCount > 0) {
        toast.success("Adjust salary successfully!");
        closeModal();
        refetch();
      } else {
        console.log("Adjust salary successfully!");
        closeModal();
      }
    } catch (err) {
      closeModal();
      toast.error("Sorry!");
      console.error(err)
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between container mx-auto">
        <Typography variant="h2" color="blue-gray" className="font-montserrat">
          All Employee List
        </Typography>
        <Button className='' onClick={() => setViewMode(viewMode === 'table' ? 'grid' : 'table')}>
          { viewMode === 'table' ? 'Card View' : 'Table View'}
        </Button>
      </div>
      <div className="">
        {viewMode === 'table' ? (
          <AllEmployeeListTable allEmployee={allEmployee} isLoading={isLoading} refetch={refetch} openModal={openModal} closeModal={closeModal} handleUpdateHR={handleUpdateHR} handleUpdateFired={handleUpdateFired} onSubmit={onSubmit} isModalOpen={isModalOpen} register={register} handleSubmit={handleSubmit} errors={errors} />
        ) : (
          <AllEmployeeCard allEmployee={allEmployee} isLoading={isLoading} refetch={refetch} openModal={openModal} closeModal={closeModal} handleUpdateHR={handleUpdateHR} handleUpdateFired={handleUpdateFired} onSubmit={onSubmit} isModalOpen={isModalOpen} register={register} handleSubmit={handleSubmit} errors={errors} />
        )}
      </div>
    </div>
  );
};

export default EmployeeList;