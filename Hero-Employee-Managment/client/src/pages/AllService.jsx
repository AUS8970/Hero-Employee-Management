import React from 'react';
import ServiceCard from '../home/ServiceCard';

const AllService = () => {
  const services = [
    {
      id: 1,
      image: "https://i.ibb.co/Y0Rbygg/Employee-Monitoring.jpg",
      title: "Employee Monitoring",
      description: "Track employee progress and productivity with real-time updates.",
    },
    {
      id: 2,
      image: "https://i.ibb.co/wCNSGJ7/Salary-Management.jpg",
      title: "Salary Management",
      description: "Manage and disburse employee salaries accurately and on time.",
    },
    {
      id: 3,
      image: "https://i.ibb.co/gD4bPSc/Task-Assignment.jpg",
      title: "Task Assignment",
      description: "Assign and manage tasks effectively to ensure deadlines are met.",
    },
    {
      id: 4,
      image: "https://i.ibb.co/ByyrspY/Performance-Analytics.jpg",
      title: "Performance Analytics",
      description: "Analyze employee performance with data-driven insights.",
    },
    {
      id: 5,
      image: "https://i.ibb.co/4KBscVM/Contract-Management.jpg",
      title: "Contract Management",
      description: "Organize, track, and manage contracts effortlessly.",
    },
    {
      id: 6,
      image: "https://i.ibb.co/pXGXbtf/HR-Workflow.jpg",
      title: "HR Workflow",
      description: "Automate HR processes for better efficiency and compliance.",
    },
    {
      id: 7,
      image: "https://i.ibb.co/HPPLrbQ/Employee-Benefits.jpg",
      title: "Employee Benefits",
      description: "Administer benefits like insurance, bonuses, and perks.",
    },
    {
      id: 8,
      image: "https://i.ibb.co/bQ5nSxX/Leave-Management.jpg",
      title: "Leave Management",
      description: "Track and approve employee leave requests easily.",
    },
  ];

  return (
    <section className="p-8 bg-gray-50">
      <h2 className="text-4xl font-bold text-center mt-16 mb-8">Our All Services</h2>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {services.map(service => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </section>
  );
};

export default AllService;
