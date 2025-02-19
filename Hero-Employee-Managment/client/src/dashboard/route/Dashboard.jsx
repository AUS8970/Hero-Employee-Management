import { Avatar, Spinner, Typography } from '@material-tailwind/react';
import { Link, Outlet } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import useRole from '../../auth/hook/useRole';
import useAuth from '../../auth/hook/useAuth';

const Dashboard = () => {

  const role = useRole();

  const { user } = useAuth();
  
  const links = [
    ...(role === 'Employee' ? [
      { to: "work-sheet", label: "Work Sheet" },
      { to: "payment-history", label: "Payment History" },
    ] : []),
    ...(role === 'HR' ? [
      { to: "employee-list", label: "Employee" },
      { to: "progress", label: "Progress" },
    ] : []),
    ...(role === 'Admin' ? [
      { to: "all-employee-list", label: "All Employee" },
      { to: "payroll", label: "Payroll" },
      { to: "visitor-message", label: "Visitor Messages" },
    ] : []),
  ];

  return (
    <div className="flex flex-col md:flex-row">
      <div className="relative bg-white border-r md:min-w-[240px] md:block hidden">
        <nav className="flex flex-col">
          <div className="flex flex-col gap-1 p-2">
            <Link to={'/'}>
              <Typography className="mr-4 cursor-pointer py-1.5 lg:ml-2 text-xl font-medium font-montserrat flex gap-2">
                <span className=""> HERO </span>
                <span className=""> EM </span>
              </Typography>
            </Link>
            {links.map((link) => (
              <div key={link.to} className="">
                <NavLink to={link.to} className={({ isActive }) => `flex w-full items-center rounded-lg p-3 transition-all ${ isActive ? "bg-black bg-opacity-5" : "hover:bg-black hover:bg-opacity-5" }`}>
                  <span className="text-slate-600 text-sm">{link.label}</span>
                </NavLink>
              </div>
            ))}
          </div>
          {/* <Link to={'/profile'} className="flex gap-2 items-center p-2 bg-blue-gray-200">
            <Avatar variant="circular" alt={user?.displayName} className="cursor-pointer w-16 h-16" src={user?.photoURL} />
            <div className="">
              <h2 className="text-xl font-semibold"> {user?.displayName} </h2>
              <p className=""> {user?.email} </p>
            </div>
          </Link> */}
        </nav>
      </div>
      <div className="flex-1 w-full p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;