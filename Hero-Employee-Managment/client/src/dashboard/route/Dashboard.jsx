import { Spinner } from '@material-tailwind/react';
import { Outlet } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import useRole from '../../auth/hook/useRole';

const Dashboard = () => {

  const role = useRole();
  
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
        <nav className="flex flex-col gap-1 p-2">
          {links.map((link) => (
            <div key={link.to} className="">
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `flex w-full items-center rounded-lg p-3 transition-all ${
                    isActive ? " bg-black bg-opacity-5" : "hover:bg-black hover:bg-opacity-5"
                  }`
                }
              >
                <span className="text-slate-600 text-sm">{link.label}</span>
              </NavLink>
            </div>
          ))}
        </nav>
      </div>
      <div className="flex-1 w-full p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;