import { Card, CardBody, CardHeader, Typography } from "@material-tailwind/react";
import Chart from "react-apexcharts";

// Function to format month and year
const formatMonthYear = (dateString) => {
  const date = new Date(dateString);
  const formatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
  });
  return formatter.format(date);
};
 
export default function BarChart({ employee, salaryData }) {

  const { bank_account_no, designation, email, image, isVerified, name, role, salary, paymentDate } = employee || {};

  const categories = salaryData.map(item => formatMonthYear(item.month));
  const data = salaryData.map(item => item.salary);

  const chartConfig = {
    type: "bar",
    height: 240,
    series: [{ name: "Salary", data: data }],
    options: {
      chart: { toolbar: { show: false }},
      title: { show: "" },
      dataLabels: { enabled: false },
      colors: ["#020617"],
      plotOptions: { bar: { columnWidth: "40%", borderRadius: 2 }},
      xaxis: {
        categories: categories,
        axisTicks: { show: false },
        axisBorder: { show: false },
        labels: { style: { colors: "#616161", fontSize: "12px", fontFamily: "inherit", fontWeight: 400 }},
      },
      yaxis: {
        labels: {
          style: { colors: "#616161",  fontSize: "12px", fontFamily: "inherit", fontWeight: 400 },
        },
      },
      grid: {
        show: true,
        borderColor: "#dddddd",
        strokeDashArray: 5,
        xaxis: { lines: { show: true }},
        padding: { top: 5,  right: 20 },
      },
      fill: { opacity: 0.8 },
      tooltip: { theme: "dark" },
    },
  };

  return (
    <Card className="">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="flex flex-col gap-4 w-full rounded-none md:flex-row items-center"
      >
        <div className="w-max rounded-full bg-gray-900 text-white">
          <img src={image} alt="" className="h-14 w-14 rounded-full" />
        </div>
        <div className="flex w-full items-center justify-between">
          <div>
            <Typography variant="h5" color="blue-gray">
              {name}
            </Typography>
            <Typography variant="small" color="blue-gray">
              {designation}
            </Typography>
            <Typography
              variant="small"
              color="gray"
              className="max-w-sm font-normal"
            >
              {email}
            </Typography>
          </div>
          <div className="mr-10">
            <Typography variant="h6" color="blue-gray" className="text-end">
              {role}
            </Typography>
            <Typography
              variant="small"
              color="gray"
              className="max-w-sm font-normal text-end"
            >
              Bank Account: {bank_account_no}
            </Typography>
          </div>
        </div>
      </CardHeader>
      <CardBody className="px-2 pb-0">
        <Chart {...chartConfig} />
      </CardBody>
    </Card>
  );
}