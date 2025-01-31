import React, { useState } from "react";
import MembersTable from "../shared/Table";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { Button, Input, Option, Select, Popover, PopoverHandler, PopoverContent, Typography } from "@material-tailwind/react";
import { Calendar } from 'react-date-range'
import { Controller, useForm } from "react-hook-form";
import { format } from "date-fns";
import useAxiosSecure from "../../auth/hook/useAxiosSecure";
import toast from "react-hot-toast";
import useAuth from "../../auth/hook/useAuth";
import { useQuery } from "@tanstack/react-query";

const WorkSheet = () => {
  const [workData, setWorkData] = useState([]);
  const { register, control, handleSubmit, reset, formState: { errors } } = useForm();
  const [date, setDate] = useState(new Date());

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: works = {}, isLoading, refetch } = useQuery({
    queryKey: ['works'],
    queryFn: async () => {
      const { data } = await axiosSecure(`/work-sheet/${user.email}`)
      return data;
    },
  });

  const onSubmit = async (data) => {
    try {
      const newWork = {
        ...data,
        date: format(date, "yyyy-MM-dd"),
      };
      setWorkData([newWork, ...workData]);
      reset();

      const sheetInfo = {
        task: data.task,
        hoursWorked: parseFloat(data.hoursWorked),
        date: date,
        employee: {
          name: user?.displayName,
          email: user?.email,
          photo: user?.photoURL
        },
      };

      console.log(sheetInfo)
  
      // Send data to the server
      const response = await axiosSecure.post("/work-sheet", sheetInfo);
      if (response.data.insertedId) {
        toast.success("Data Save Successful!");
        reset();
        refetch();
      };
    } catch (error) {
      console.error(error);
      toast.error("An error occurred during registration.");
    }
  };

  return (
    <div className="container mx-auto text-center px-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 justify-between items-start">
        <div className="">
          <Typography className="font-montserrat py-5" variant="h4" color="blue-gray">
            Wrok Add Form
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center gap-4 w-full bg-gray-50 p-10 rounded-xl">
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
            <div className="w-full">
              <Popover placement="bottom">
                <PopoverHandler>
                  <Input
                    label="Select a Date"
                    
                    readOnly
                    value={date ? format(date, "PPP") : ""}
                  />
                </PopoverHandler>
                <PopoverContent>
                  <Calendar
                    date={date}
                    onChange={(item) => setDate(item)}
                    // {...register("date", { required: "Please enter a date!" })}
                    color="#4cc718"
                  />
                </PopoverContent>
              </Popover>
              {errors.date && <span className="text-red-500 text-sm font-medium">{errors.date.message}</span>}
            </div>
            <Button className="w-full" type="submit"> Add </Button>
          </form>
        </div>
        <div className="">
          <Typography className="font-montserrat py-5" variant="h4" color="blue-gray">
            Wrok Sheet List
          </Typography>
          <MembersTable isLoading={isLoading} works={works} refetch={refetch} />
        </div>
      </div>
    </div>
  );
};

export default WorkSheet;