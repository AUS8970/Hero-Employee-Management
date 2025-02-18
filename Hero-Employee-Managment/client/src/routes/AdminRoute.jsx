import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const [role, isLoading] = useRole()

  if (isLoading) return <LoadingSpinner />
  if (role === 'Admin') return children;
  return <Navigate to='/dashboard' replace='true' />
};

export default AdminRoute;