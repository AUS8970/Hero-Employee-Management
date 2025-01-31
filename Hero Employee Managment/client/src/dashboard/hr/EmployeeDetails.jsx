import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from 'recharts';
import useAxiosSecure from '../../auth/hook/useAxiosSecure';
import Profile from '../../shared/Profile';
import { useQuery } from '@tanstack/react-query';
import BarChart from '../shared/EmployeeChart';

// const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];

// const getPath = (x, y, width, height) => {
//   return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
//   ${x + width / 2}, ${y}
//   C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
//   Z`;
// };

// const TriangleBar = (props) => {
//   const { fill, x, y, width, height } = props;

//   return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
// };

const EmployeeDetails = () => {
  const { slug } = useParams();
  const axiosSecure = useAxiosSecure();
  const [employee, setEmployee] = useState({});
  const [salaryData, setSalaryData] = useState([]);

  console.log('employee', employee)
  console.log('salaryData', salaryData)
  console.log('slug', slug)

  // useEffect(() => {
  //   const fetchEmployeeData = async () => {
  //     const { data } = await axiosSecure(`/employee/${slug}`);
      // console.log('data', data)
      // setEmployee(data.employee);
      // setSalaryData(data.salaryHistory);
  //   };
  //   fetchEmployeeData();
  // }, [slug, axiosSecure]);

  const { data: employeeData = {}, isLoading, refetch } = useQuery({
    queryKey: ['employee'],
    queryFn: async () => {
      const { data } = await axiosSecure(`/employee/${slug}`)
      console.log('data', data)
      setEmployee(data.employee);
      setSalaryData(data.salaryHistory);
      return data;
    },
  });

  return (
    <div>
      {/* <div className="">
        <Profile employeeData={employee} />
      </div> */}
      <div className="max-w-6xl mx-auto">
        <BarChart employee={employee} salaryData={salaryData} />
      </div>
      {/* <BarChart width={600} height={300} data={salaryData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="salary" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
          {salaryData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % 20]} />
          ))}
        </Bar>
      </BarChart> */}
    </div>
  );
};

export default EmployeeDetails;