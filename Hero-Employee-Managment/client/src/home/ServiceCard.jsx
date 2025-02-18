import { Button } from '@material-tailwind/react';
import React from 'react';

const ServiceCard = ({service}) => {

  return (
    <div className="relative flex group flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg">
      <div className="relative h-56 m-2.5 overflow-hidden text-white rounded-md">
        <img className='w-full h-full group-hover:scale-110 transition' src={service.image} alt="card-image" />
      </div>
      <div className="px-4">
        <h6 className="text-slate-800 text-lg font-semibold">
          {service.title}
        </h6>
        <p className="text-slate-600 leading-normal font-light mb-2">
          {service.description}
        </p>
      </div>
      <div className="px-4 pb-4 pt-0">
        <Button className="rounded-md py-2 px-4 border border-transparent text-center text-sm transition-all shadow-md hover:shadow-lg focus:shadow-none active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
          See more
        </Button>
      </div>
    </div>
  );
};

export default ServiceCard;