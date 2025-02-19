import React from 'react';
import ServiceCard from './ServiceCard';

const Services = () => {

  const services = [
    {
      id: 1,
      image: "https://i.ibb.co.com/Y0Rbygg/Employee-Monitoring.jpg",
      title: "Employee Monitoring",
      description: "Track employee progress, workflow, and productivity efficiently with real-time updates, ensuring smoother project execution and task management.",
    },
    {
      id: 2,
      image: "https://i.ibb.co.com/wCNSGJ7/Salary-Management.jpg",
      title: "Salary Management",
      description: "Simplify payroll processes by managing and disbursing employee salaries accurately and on time with streamlined tools.",
    },
    {
      id: 3,
      image: "https://i.ibb.co.com/gD4bPSc/Task-Assignment.jpg",
      title: "Task Assignment",
      description: "Prioritize, assign, and manage tasks effectively to ensure deadlines are met and teamwork is seamless.",
    },
    {
      id: 4,
      image: "https://i.ibb.co.com/ByyrspY/Performance-Analytics.jpg",
      title: "Performance Analytics",
      description: "Analyze employee performance with data-driven insights to improve productivity and identify areas for development.",
    },
    {
      id: 5,
      image: "https://i.ibb.co.com/4KBscVM/Contract-Management.jpg",
      title: "Contract Management",
      description: "Organize, track, and manage contracts and agreements for employees and clients effortlessly.",
    },
    {
      id: 6,
      image: "https://i.ibb.co.com/pXGXbtf/HR-Workflow.jpg",
      title: "HR Workflow",
      description: "Automate and streamline HR processes, from recruitment to payroll, for better efficiency and compliance.",
    },
    {
      id: 7,
      image: "https://i.ibb.co.com/HPPLrbQ/Employee-Benefits.jpg",
      title: "Employee Benefits",
      description: "Administer benefits like insurance, bonuses, and perks while keeping employees motivated and satisfied.",
    },
    {
      id: 8,
      image: "https://i.ibb.co.com/bQ5nSxX/Leave-Management.jpg",
      title: "Leave Management",
      description: "Simplify tracking, reviewing, and approving employee leave requests, ensuring better workforce planning and resource allocation.",
    },
  ]

  return (
    <section className="p-8 bg-gray-50">
      <h2 className="text-4xl font-bold text-center m-6">Our Services</h2>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        { services.map(service => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </section>
  );
};

export default Services;