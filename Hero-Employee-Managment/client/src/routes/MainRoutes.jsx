import React from 'react';
import { Navber } from '../shared/Navber';
import { Footer } from '../shared/Footer';
import { Outlet, useLocation } from 'react-router-dom';

const MainRoutes = () => {

  const location = useLocation();
  const hideNavAndFot = location.pathname.includes('dashboard');
  
  return (
    <div className='font-montserrat max-w-screen-2xl mx-auto'>
      { hideNavAndFot || <Navber />}
      <Outlet />
      { hideNavAndFot || <Footer /> }
    </div>
  );
};

export default MainRoutes;