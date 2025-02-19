import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Button } from '@material-tailwind/react';
import { RiRobot2Fill } from "react-icons/ri";
import { FaChartArea } from "react-icons/fa";
import { RiSecurePaymentLine } from "react-icons/ri";
import { MdManageAccounts } from "react-icons/md";
import React from "react";

const AboutUs = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        <div className="flex flex-col-reverse md:flex-row items-center gap-10">
          
          {/* Left Side - Text Content */}
          <div className="md:w-5/12 text-center md:text-left">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Who We Are?
            </h2>
            <p className="text-gray-600 mb-4">
              Hero Employee Management is a smart and efficient platform that 
              helps businesses streamline employee management, payroll processing, 
              and performance tracking effortlessly.
            </p>

            {/* Key Points */}
            <ul className="text-gray-700 space-y-2">
              <li className='flex items-center gap-1'> 
                <MdManageAccounts /> 
                <span> Streamlined Employee Management </span> 
              </li>
              <li className='flex items-center gap-1'> 
                <RiSecurePaymentLine /> 
                <span> Secure Payroll System </span> 
              </li>
              <li className='flex items-center gap-1'> 
                <FaChartArea /> 
                <span> Performance & Task Tracking </span> 
              </li>
              <li className='flex items-center gap-1'> 
                <RiRobot2Fill /> 
                <span> 24/7 HR Support & Automation </span> 
              </li>
            </ul>

            {/* CTA Button */}
            <Button className="mt-5"> Learn More </Button>
          </div>

          {/* Right Side - Image */}
          <div className="md:w-7/12">
            <div className="w-full style">
              <img src="https://i.ibb.co.com/hJQ2TK4b/Emplyee-Menegement.png" alt="" className="w-[500px]" />
              {/* <DotLottieReact src="https://lottie.host/9b8bf9ea-1984-4256-8c47-f227d4207fa5/3HFaFCb82k.lottie" loop autoplay /> */}
              {/* <DotLottieReact src="https://lottie.host/bdb8926b-3703-48d3-a973-8ffdcd0eb021/pvz5Ccw0jE.lottie" loop autoplay /> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;


    
