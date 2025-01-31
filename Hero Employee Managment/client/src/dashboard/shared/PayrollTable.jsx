import React, { useState } from "react";
import { Card, Typography, Button, Spinner } from "@material-tailwind/react";
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from "react-hook-form";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import toast from "react-hot-toast";
import useAxiosSecure from "../../auth/hook/useAxiosSecure";
import { format, parseISO } from "date-fns";
import PayrollModal from "./PayrollModal";

const PayrollTable = () => {
  const [ isModalOpen, setIsModalOpen ] = useState(false);
  const [ selectedItem, setSelectedItem ] = useState(null);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: payrolls = {}, isLoading, refetch } = useQuery({
    queryKey: ['payrolls'],
    queryFn: async () => {
      const { data } = await axiosSecure(`/payroll`)
      return data;
    },
  });

  if (isLoading) return <div className="flex items-center justify-center my-28"> <Spinner /> </div>

  const openModal = (item) => {
    setSelectedItem(item)
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  
  return (
    <Card className="max-w-4xl mx-auto h-full w-full">
      <table className="w-full table-auto text-left">
        <thead>
          <tr className="rounded-2xl">
            {["Name", "Salary", "Time", "Pay", "Payment Date"].map((head) => (
              <th key={head} className="p-4 bg-gray-50">
                <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {payrolls.map((item) => (
            <tr key={item?._id} className="font-montserrat">
              {/* Name */}
              <td className="p-4 border-b border-blue-gray-50">
                <Typography variant="small" color="blue-gray" className="font-normal "> {item.name} </Typography>
              </td>
              {/* Salary */}
              <td className="p-4 border-b border-blue-gray-50">
                <Typography variant="small" color="blue-gray" className="font-normal"> {item.salary} </Typography>
              </td>
              {/* Time */}
              <td className="p-4 border-b border-blue-gray-50">
                <Typography variant="small" color="blue-gray" className="font-normal"> 
                  {item.month ? format(parseISO(item.month), "MMMM yyyy") : ""} 
                </Typography>
              </td>
              {/* Pay */}
              <td className="p-4 border-b border-blue-gray-50">
                <Button 
                  onClick={() => openModal(item)}
                  className={`p-1 ${item.paymentDate ? 'bg-green-500' : 'bg-red-200'}`} 
                  disabled={!!item.paymentDate}
                >
                  {item.paymentDate ? 'Paid' : 'Pay'}
                </Button>
              </td>
              {/* Payment Date */}
              <td className="p-4 border-b border-blue-gray-50">
                <Typography variant="small" color="blue-gray" className="font-normal"> 
                  {item.paymentDate ? new Date(item.paymentDate).toLocaleDateString() : 'Pending'}
                </Typography>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <PayrollModal 
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          selectedItem={selectedItem}
          refetch={refetch}
        />
      </div>
    </Card>
  );
};

export default PayrollTable;