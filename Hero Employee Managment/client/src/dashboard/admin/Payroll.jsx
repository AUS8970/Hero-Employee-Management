import React from 'react';
import PayrollTable from '../shared/PayrollTable';
import { Typography } from '@material-tailwind/react';

const Payroll = () => {
  return (
    <div>
      <div className="text-center py-4">
        <Typography variant="h2" color="blue-gray" className="font-montserrat">
          Payroll
        </Typography>
      </div>
      <PayrollTable />
    </div>
  );
};

export default Payroll;