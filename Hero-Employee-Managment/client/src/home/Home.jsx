import React from 'react';
import Banner from './Banner';
import Achievements from './Achievements';
import Testimonials from './Testimonials';
import Services from './Services';
import AboutUs from './AboutUs';

const Home = () => {

  return (
    <div className="">
      <Banner />
      <AboutUs />
      <Services />
      <Testimonials />
      <Achievements />
    </div>
  );
};

export default Home;