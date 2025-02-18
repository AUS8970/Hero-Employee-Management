import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../auth/hook/useAuth';
import { Spinner } from '@material-tailwind/react';

const PrivateRoutes = ({ children }) => {

  const { user, loading } = useAuth();
  const location = useLocation();

  // const [role] = useRole();
  // if (!allowedRoles.includes(role)) return <Navigate to="/unauthorized" />;

  if(loading) return <div className="flex items-center justify-center my-52"> <Spinner /> </div>
  if(user) return children;

  return <Navigate to={'/login'} state={{from: location}} replace> </Navigate>
};

export default PrivateRoutes;