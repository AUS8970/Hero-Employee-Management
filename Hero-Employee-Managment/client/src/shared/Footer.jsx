import { Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";

const currentYear = new Date().getFullYear();
 
export function Footer() {
  return (
    <footer className="relative w-full">
      <div className="mx-auto w-full px-8 bg-gray-100 py-5">
        <Typography variant="small" className="mb-4 text-center font-normal text-blue-gray-900 md:mb-0">
          &copy; {currentYear} <Link to="/"> Hero Employee Management</Link>. All Rights Reserved.
        </Typography>
      </div>
    </footer>
  );
}