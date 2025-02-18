import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecure from '../../auth/hook/useAxiosSecure';
import { Option, Select, Typography } from '@material-tailwind/react';
import { format } from 'date-fns';
import ProgressTable from '../shared/ProgressTable';

const Progress = () => {
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const axiosSecure = useAxiosSecure()

  const { data: works = [], isLoading, refetch } = useQuery({
    queryKey: ['works'],
    queryFn: async () => {
      const { data } = await axiosSecure(`/work-sheet`);
      return data;
    },
  });

  const filterData = () => {
    let filteredWorks = Array.isArray(works) ? works : [];

    if (selectedEmployee) {
      filteredWorks = filteredWorks.filter(work => work.employee.name === selectedEmployee);
    }

    if (selectedMonth) {
      filteredWorks = filteredWorks.filter(work => {
        const workMonth = new Date(work.date).getMonth() + 1;
        return workMonth === parseInt(selectedMonth);
      });
    }

    return filteredWorks;
  };

  const totalHours = filterData().reduce((sum, work) => sum + (Number(work.hoursWorked) || 0), 0);

  console.log(totalHours)


  return (
    <div className='max-w-4xl mx-auto'>
      <Typography className="font-montserrat py-5 text-center" variant="h3" color="blue-gray">
        Progress
      </Typography>
      <div className="grid grid-cols-3 items-center gap-4 mb-4">
        <Select value={selectedEmployee} label="Select Employee" onChange={(e) => setSelectedEmployee(e)}>
          <Option value=""> All Employees </Option>
          {works.map(work => (
            <Option key={work._id} value={work.employee.name}>
              {work.employee.name}
            </Option>
          ))}
        </Select>

        <Select value={selectedMonth} label="Select Month" onChange={(e) => setSelectedMonth(e)}>
          <Option value=""> All Months </Option>
          {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
            <Option key={month} value={month}>
              {format(new Date(0, month - 1), "MMMM")}
            </Option>
          ))}
        </Select>
        <Typography variant="h6" color="blue-gray">
          Total Hours: {totalHours}
        </Typography>
      </div>
      <ProgressTable works={filterData()} />
    </div>
  );
};

export default Progress;