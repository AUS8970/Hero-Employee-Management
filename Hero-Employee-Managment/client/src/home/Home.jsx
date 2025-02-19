import React from 'react';
import Banner from './Banner';
import Achievements from './Achievements';
import Testimonials from './Testimonials';
import Services from './Services';
import AboutUs from './AboutUs';
import OurTeam from './OurTeam';
import FAQs from './FAQs';
import EmployeeBenefits from './EmployeeBenefits';

const Home = () => {

  return (
    <div className="">
      <Banner />
      <AboutUs />
      <Services />
      <OurTeam />
      <Testimonials />
      <EmployeeBenefits />
      <FAQs />
      <Achievements />
    </div>
  );
};

export default Home;