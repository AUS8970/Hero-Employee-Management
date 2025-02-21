import React from "react";
import { Menu, MenuHandler, MenuList, MenuItem, Avatar, Navbar, Collapse, Typography, Button, IconButton, List, ListItem, Spinner } from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../auth/hook/useAuth";
import { HiOutlineLogout } from "react-icons/hi";
import toast from "react-hot-toast";
import useRole from "../auth/hook/useRole";

function LogOutButton(){

  const { logOut } = useAuth();

  const handleLogOut = () => {
    logOut()
    .then(() => { 
      toast.success("Logout Seccessfull!")
    }) .catch (err => { toast.error(err)})
  }
  
  return (
    <>
      <Button onClick={handleLogOut} className="font-montserrat" size="sm" fullWidth>
        Log Out
      </Button> 
    </>
  )
};
 
function ProfileMenu() {

  const {user, logOut} = useAuth();

  const handleLogOut = () => {
    logOut()
    .then(() => {
      toast.success("Logout Seccessfull!")
    }) .catch (err => {
      toast.error(err)
      console.log(err)
    })
  }

  return (
    <Menu>
      <MenuHandler>
        <Avatar
          variant="circular"
          alt="tania andrew"
          className="cursor-pointer"
          src={user.photoURL}
        />
      </MenuHandler>
      <MenuList>
        {/* My Profile */}
        <MenuItem className="flex items-center gap-2">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M16 8C16 10.1217 15.1571 12.1566 13.6569 13.6569C12.1566 15.1571 10.1217 16 8 16C5.87827 16 3.84344 15.1571 2.34315 13.6569C0.842855 12.1566 0 10.1217 0 8C0 5.87827 0.842855 3.84344 2.34315 2.34315C3.84344 0.842855 5.87827 0 8 0C10.1217 0 12.1566 0.842855 13.6569 2.34315C15.1571 3.84344 16 5.87827 16 8ZM10 5C10 5.53043 9.78929 6.03914 9.41421 6.41421C9.03914 6.78929 8.53043 7 8 7C7.46957 7 6.96086 6.78929 6.58579 6.41421C6.21071 6.03914 6 5.53043 6 5C6 4.46957 6.21071 3.96086 6.58579 3.58579C6.96086 3.21071 7.46957 3 8 3C8.53043 3 9.03914 3.21071 9.41421 3.58579C9.78929 3.96086 10 4.46957 10 5ZM8 9C7.0426 8.99981 6.10528 9.27449 5.29942 9.7914C4.49356 10.3083 3.85304 11.0457 3.454 11.916C4.01668 12.5706 4.71427 13.0958 5.49894 13.4555C6.28362 13.8152 7.13681 14.0009 8 14C8.86319 14.0009 9.71638 13.8152 10.5011 13.4555C11.2857 13.0958 11.9833 12.5706 12.546 11.916C12.147 11.0457 11.5064 10.3083 10.7006 9.7914C9.89472 9.27449 8.9574 8.99981 8 9Z"
              fill="#90A4AE"
            />
          </svg>
 
          <Typography variant="small" className="font-medium">
            My Profile
          </Typography>
        </MenuItem>
        {/* Edit Profile */}
        <MenuItem className="flex items-center gap-2">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9.48999 1.17C9.10999 -0.39 6.88999 -0.39 6.50999 1.17C6.45326 1.40442 6.34198 1.62213 6.18522 1.80541C6.02845 1.9887 5.83063 2.13238 5.60784 2.22477C5.38505 2.31716 5.1436 2.35564 4.90313 2.33709C4.66266 2.31854 4.42997 2.24347 4.22399 2.118C2.85199 1.282 1.28199 2.852 2.11799 4.224C2.65799 5.11 2.17899 6.266 1.17099 6.511C-0.390006 6.89 -0.390006 9.111 1.17099 9.489C1.40547 9.54581 1.62322 9.65719 1.80651 9.81407C1.98979 9.97096 2.13343 10.1689 2.22573 10.3918C2.31803 10.6147 2.35639 10.8563 2.33766 11.0968C2.31894 11.3373 2.24367 11.5701 2.11799 11.776C1.28199 13.148 2.85199 14.718 4.22399 13.882C4.42993 13.7563 4.66265 13.6811 4.90318 13.6623C5.14371 13.6436 5.38527 13.682 5.60817 13.7743C5.83108 13.8666 6.02904 14.0102 6.18592 14.1935C6.34281 14.3768 6.45419 14.5945 6.51099 14.829C6.88999 16.39 9.11099 16.39 9.48899 14.829C9.54599 14.5946 9.65748 14.377 9.8144 14.1939C9.97132 14.0107 10.1692 13.8672 10.3921 13.7749C10.6149 13.6826 10.8564 13.6442 11.0969 13.6628C11.3373 13.6815 11.57 13.7565 11.776 13.882C13.148 14.718 14.718 13.148 13.882 11.776C13.7565 11.57 13.6815 11.3373 13.6628 11.0969C13.6442 10.8564 13.6826 10.6149 13.7749 10.3921C13.8672 10.1692 14.0107 9.97133 14.1939 9.81441C14.377 9.65749 14.5946 9.546 14.829 9.489C16.39 9.11 16.39 6.889 14.829 6.511C14.5945 6.45419 14.3768 6.34281 14.1935 6.18593C14.0102 6.02904 13.8666 5.83109 13.7743 5.60818C13.682 5.38527 13.6436 5.14372 13.6623 4.90318C13.681 4.66265 13.7563 4.42994 13.882 4.224C14.718 2.852 13.148 1.282 11.776 2.118C11.5701 2.24368 11.3373 2.31895 11.0968 2.33767C10.8563 2.35639 10.6147 2.31804 10.3918 2.22574C10.1689 2.13344 9.97095 1.9898 9.81407 1.80651C9.65718 1.62323 9.5458 1.40548 9.48899 1.171L9.48999 1.17ZM7.99999 11C8.79564 11 9.55871 10.6839 10.1213 10.1213C10.6839 9.55871 11 8.79565 11 8C11 7.20435 10.6839 6.44129 10.1213 5.87868C9.55871 5.31607 8.79564 5 7.99999 5C7.20434 5 6.44128 5.31607 5.87867 5.87868C5.31606 6.44129 4.99999 7.20435 4.99999 8C4.99999 8.79565 5.31606 9.55871 5.87867 10.1213C6.44128 10.6839 7.20434 11 7.99999 11Z"
              fill="#90A4AE"
            />
          </svg>
 
          <Typography variant="small" className="font-medium">
            Edit Profile
          </Typography>
        </MenuItem>
        <hr className="my-2 border-blue-gray-50" />
        {/* Log Out */}
        <MenuItem onClick={handleLogOut} className="flex items-center gap-2 ">
          <div className="text-xl">
            <HiOutlineLogout />
          </div>
          <Typography variant="small" className="font-medium">
            Log Out
          </Typography>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}

function NavList() {

  const role = useRole();

  const dashboardRoute = {
    Admin: "/dashboard/all-employee-list",
    HR: "/dashboard/employee-list",
    Employee: "/dashboard/work-sheet",
  }[role] || "/login";

  return (
    <List className="mb-6 mt-4 p-0 lg:mb-0 lg:mt-0 lg:flex-row lg:p-1">
      <NavLink 
      to={dashboardRoute}
      // onClick={() => setOpenNav(false)}
      >
        <Typography
          as="a"
          variant="small"
          color="blue-gray"
          className="font-medium"
        >
          <ListItem className="flex items-center gap-2 py-2 pr-4">
            Dashboard
          </ListItem>
        </Typography>
      </NavLink>
      <NavLink to={'/contact'}>
        <Typography
          as="a"
          variant="small"
          color="blue-gray"
          className="font-medium"
        >
          <ListItem className="flex items-center gap-2 py-2 pr-4">
            Contact Us
          </ListItem>
        </Typography>
      </NavLink>
    </List>
  );
};

function LogInButton(){
  return (
    <>
      <Link to={'/register'}> 
        <Button className="font-montserrat" variant="outlined" size="sm" fullWidth>
          Register
        </Button>
      </Link>
      <Link to={'/login'}> 
        <Button className="font-montserrat" size="sm" fullWidth>
          Log In 
        </Button> 
      </Link>
    </>
  )
};
 
export function NavigationbarWithDropdownMultilevelMenu() {

  const {user} = useAuth();
  const [openNav, setOpenNav] = React.useState(false);
 
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);
 
  return (
    <Navbar className="px-4 py-2 shadow-none">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Link to={'/'}>
          <Typography className="mr-4 cursor-pointer py-1.5 lg:ml-2 text-xl font-medium font-montserrat flex gap-2">
            <span className=""> HERO </span>
            <span className=""> EM </span>
          </Typography>
        </Link>
        <div className="hidden lg:block">
          <NavList />
        </div>
        <div className="hidden gap-2 lg:flex">
          {
            user ? <>
              <ProfileMenu />
            </> : <>
              <LogInButton />
            </>
          }
        </div>
        <IconButton
          variant="text"
          className="lg:hidden"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavList />
        <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden">
        {
            user ? <>
              <LogOutButton />
            </> : <>
              <LogInButton />
            </>
          }
        </div>
      </Collapse>
    </Navbar>
  );
};