import React from 'react';
import { BrowserRouter as Router, Routes as RouterDom, Route } from 'react-router-dom';
import Home from '../home/Home';
import Contact from '../pages/Contact';
import MainRoutes from './MainRoutes';
import { SimpleLoginForm } from '../auth/page/Login';
import { SimpleRegisterForm } from '../auth/page/Register'
import Dashboard from '../dashboard/route/Dashboard';
import WorkSheet from '../dashboard/employee/WorkSheet';
import PaymentHistory from '../dashboard/employee/PaymentHistory';
import EmployeeList from '../dashboard/hr/EmployeeList';
import EmployeeDetails from '../dashboard/hr/EmployeeDetails';
import Progress from '../dashboard/hr/Progress';
import Payroll from '../dashboard/admin/Payroll';
import AllEmployeeList from '../dashboard/admin/AllEmployeeList';
import PrivateRoutes from './PrivateRoutes';
import ErrorPage from '../pages/ErrorPage';
import VisitorMessage from '../dashboard/admin/visitorMessage';
import MyProfile from '../profile/MyProfile';
import EditProfile from '../profile/EditProfile';
import AllService from '../pages/AllService';

const Routes = () => {
  return (
    <Router>
      <RouterDom>
        <Route path="/" element={<MainRoutes />}>
          <Route index element={<Home />} />
          <Route path="contact" element={<Contact />} />
          <Route path="all-service" element={<AllService />} />
          <Route path="profile" element={<MyProfile />} />
          <Route path="update-profile" element={<EditProfile />} />
          <Route path="login" element={<SimpleLoginForm />} />
          <Route path="register" element={<SimpleRegisterForm />} />
          <Route path="dashboard" element={<PrivateRoutes> <Dashboard /> </PrivateRoutes>}>
            {/* Employee Routes */}
            <Route index path="work-sheet" element={<PrivateRoutes> <WorkSheet /> </PrivateRoutes>} />
            <Route path="payment-history" element={<PrivateRoutes> <PaymentHistory /> </PrivateRoutes>} />
            {/* HR Routes */}
            <Route path="employee-list" element={<PrivateRoutes> <EmployeeList /> </PrivateRoutes>} />
            <Route path="details/:slug" element={<PrivateRoutes> <EmployeeDetails /> </PrivateRoutes>} />
            <Route path="progress" element={<PrivateRoutes> <Progress /> </PrivateRoutes>} />
            {/* Admin Routes */}
            <Route path="payroll" element={<PrivateRoutes> <Payroll /> </PrivateRoutes>} />
            <Route path="all-employee-list" element={<PrivateRoutes> <AllEmployeeList /> </PrivateRoutes>} />
            <Route path="visitor-message" element={<PrivateRoutes> <VisitorMessage /> </PrivateRoutes>} />
          </Route>
          {/* Error Page */}
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </RouterDom>
    </Router>
  );
};

export default Routes;