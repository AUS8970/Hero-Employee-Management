import React from 'react';

const InfoCard = ({ icon, title, description, link }) => {
  return (
    <div className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-96 p-6">
      <div className="flex items-center mb-4">
        <div className="h-6 w-6 text-slate-600">
          {icon}
        </div>
        <h5 className="ml-3 text-slate-800 text-xl font-semibold">
          {title}
        </h5>
      </div>
      <p className="block text-slate-600 leading-normal font-light mb-4">
        {description}
      </p>
      <div>
        <a href={link} className="text-slate-800 font-semibold text-sm hover:underline flex items-center">
          Learn More
          <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>
    </div>
  );
};

const leaveManagementCard = {
  icon: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6 text-slate-600">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5V6a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 6v12a2.25 2.25 0 01-2.25 2.25H8.25M3 16.5L7.5 12M3 16.5l4.5 4.5M14.25 9V6m0 3v6M16.5 12h-4.5" />
    </svg>
  ),
  title: "Leave Management Portal",
  description: "Streamline leave requests and approvals with an intuitive portal, ensuring a balanced workload.",
  link: "/leave-management"
};

const payrollManagementCard = {
  icon: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6 text-slate-600">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c1.105 0 2 .895 2 2s-.895 2-2 2-2-.895-2-2 .895-2 2-2zM2 9c0 2.28 1.843 4 4 4 0 1.657 1.568 3 3.5 3S13 14.657 13 13c0-2.28 1.843-4 4-4 0-1.657-1.568-3-3.5-3S10 7.343 10 9c-2.28 0-4 1.843-4 4 0 1.657-1.568 3-3.5 3S2 14.657 2 13c0-2.28 1.843-4 4-4" />
    </svg>
  ),
  title: "Payroll Management System",
  description: "Automate payroll processes, manage employee salaries, and generate detailed reports with ease.",
  link: "/payroll-management"
};

const performanceTrackingCard = {
  icon: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6 text-slate-600">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h7M3 14h10m-6 4h6m-3-8h10m-6 4h4M12 4l4 4-4 4m0-4H8m6 4H8m0 0L4 8l4-4" />
    </svg>
  ),
  title: "Employee Performance Tracking",
  description: "Monitor and analyze employee performance metrics to ensure continuous improvement and goal alignment.",
  link: "/performance-tracking"
};

const AchievementsPage = () => {
  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-center mb-6"> Our Achievements </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3">
        <InfoCard 
          icon={performanceTrackingCard.icon} 
          title={performanceTrackingCard.title} 
          description={performanceTrackingCard.description} 
          link={'#'} 
        />
        <InfoCard 
          icon={payrollManagementCard.icon} 
          title={payrollManagementCard.title} 
          description={payrollManagementCard.description} 
          link={'#'} 
        />
        <InfoCard 
          icon={leaveManagementCard.icon} 
          title={leaveManagementCard.title} 
          description={leaveManagementCard.description} 
          link={'#'} 
        />
      </div>
    </div>
  );
};

export default AchievementsPage;