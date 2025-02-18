import React from 'react';
import './Banner.css';
import { Button } from '@material-tailwind/react';
import { Link } from 'react-router-dom';

const Banner = () => {
  return (
    <div>
      <div className="h-14 bg-white"> </div>
      <section className="banner-image relative min-h-screen flex flex-col text-center items-center justify-center text-white">
        <div className="">
          <h2 className="text-5xl font-bold mb-4"> Welcome to <br /> Hero Employee Management </h2>
          <p className="text-lg text-gray-100 mb-4"> Empowering organizations with modern workflow solutions. </p>
          <Link to={'/contact'}> <Button> Contact Us </Button> </Link>
        </div>
      </section>
    </div>
  );
};

export default Banner;