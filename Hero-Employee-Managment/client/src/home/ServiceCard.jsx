import { Button } from '@material-tailwind/react';
import React from 'react';
import { Link } from 'react-router-dom';

const ServiceCard = ({service}) => {

  return (
    <div className="relative grid grid-cols-1 group my-5 bg-transparent shadow-sm border border-slate-200 rounded-lg overflow-hidden h-[350px]">
      <div className="">
        <img className='h-44 w-full' src={service.image} alt={service.title} />
      </div>
      <div className="">
        <div className="px-4">
          <h6 className="text-black dark:text-white text-transparent text-lg font-semibold"> {service.title} </h6>
          <p className="text-slate-600 leading-normal text-lg font-light mb-2"> {service.description} </p>
        </div>
        <Link to={'/all-service'} className="px-4 pb-4 pt-0">
          <Button className="rounded-md py-2 px-4 border border-transparent text-center text-sm transition-all shadow-md hover:shadow-lg focus:shadow-none active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
            See more
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;