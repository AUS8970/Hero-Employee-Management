import React from 'react';
import ServiceCard from './ServiceCard';

const Services = () => {

  const services = [
    { id: 1, image: "https://i.ibb.co/Y0Rbygg/Employee-Monitoring.jpg", title: "Employee Monitoring", description: "Track employee progress and productivity with real-time updates." },
    { id: 2, image: "https://i.ibb.co/wCNSGJ7/Salary-Management.jpg", title: "Salary Management", description: "Manage and disburse employee salaries accurately and on time." },
    { id: 3, image: "https://i.ibb.co/gD4bPSc/Task-Assignment.jpg", title: "Task Assignment", description: "Assign and manage tasks effectively to ensure deadlines are met." },
    { id: 4, image: "https://i.ibb.co/ByyrspY/Performance-Analytics.jpg", title: "Performance Analytics", description: "Analyze employee performance with data-driven insights." },
  ];

  return (
    <section className="p-8 bg-transparent">
      <h2 className="text-4xl font-bold text-center m-6">Our Services</h2>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        { services.map(service => ( <ServiceCard key={service.id} service={service}/> ))}
      </div>
    </section>
  );
};

export default Services;