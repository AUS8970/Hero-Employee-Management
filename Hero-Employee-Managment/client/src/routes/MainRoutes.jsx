import React from 'react';
import { NavigationbarWithDropdownMultilevelMenu } from '../shared/Navber';
import { FooterWithSitemap } from '../shared/Footer';
import { Outlet } from 'react-router-dom';

const MainRoutes = () => {
  return (
    <div className=''>
      <div className="flex justify-center">
        <NavigationbarWithDropdownMultilevelMenu />
      </div>
      <Outlet />
      <FooterWithSitemap />
    </div>
  );
};

export default MainRoutes;