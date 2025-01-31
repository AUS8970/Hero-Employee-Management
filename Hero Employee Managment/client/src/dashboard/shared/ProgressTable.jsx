import React from "react";
import { Typography } from "@material-tailwind/react";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { format } from "date-fns";

const ProgressTable = ({ works }) => {

  console.log(works)

  return (
    <div>
      <table className="w-full table-auto text-left">
        <thead>
          <tr className="rounded-2xl">
            {["Name", "Tasks", "Hours Worked", "Date"].map((head) => (
              <th key={head} className="p-4 bg-gray-50">
                <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {works.map((work) => (
            <tr key={work._id}>
              {/* Name */}
              <td className="p-4 border-b border-blue-gray-50">
                <Typography variant="small" color="blue-gray" className="font-normal"> {work.employee.name} </Typography>
              </td>
              {/* Tasks */}
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProgressTable;