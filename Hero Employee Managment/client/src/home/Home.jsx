import React from 'react';
import Banner from './Banner';
import Achievements from './Achievements';
import Testimonials from './Testimonials';
import Services from './Services';

const Home = () => {

  return (
    <div className="">
      <Banner />
      <Services />
      <Testimonials />
      <Achievements />
    </div>
  );
};

export default Home;