import React from 'react';
import EmployeeListTable from '../shared/EmployeeListTable';
import { Typography } from '@material-tailwind/react';

const EmployeeList = () => {
  return (
    <div className='font-montserrat'>
      <div className="text-center py-4">
        <Typography variant="h2" color="blue-gray" className="font-montserrat">
          Employee List
        </Typography>
      </div>
      <EmployeeListTable />
    </div>
  );
};

export default EmployeeList;