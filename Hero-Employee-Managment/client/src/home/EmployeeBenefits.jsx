import React from "react";

const benefits = [
  {
    id: 1,
    title: "Health Insurance",
    description: "We provide comprehensive health insurance coverage for all employees.",
    icon: "💊",
  },
  {
    id: 2,
    title: "Paid Leave",
    description: "Enjoy paid sick leaves and vacation days to maintain work-life balance.",
    icon: "🏖️",
  },
  {
    id: 3,
    title: "Performance Bonus",
    description: "Earn extra incentives based on your performance and dedication.",
    icon: "💰",
  },
  {
    id: 4,
    title: "Training & Development",
    description: "Get access to professional training and career growth programs.",
    icon: "📚",
  },
  {
    id: 5,
    title: "Flexible Work Hours",
    description: "Choose a work schedule that fits your personal and professional needs.",
    icon: "⏳",
  },
  {
    id: 6,
    title: "Retirement Plan",
    description: "Secure your future with our company-sponsored retirement savings plan.",
    icon: "🏦",
  },
];

const EmployeeBenefits = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">Employee Benefits</h2>
        <p className="text-gray-600 mb-10">
          We value our employees and offer a range of benefits to ensure their well-being and satisfaction.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {benefits.map((benefit) => (
            <div key={benefit.id} className="card bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
              <div className="text-5xl">{benefit.icon}</div>
              <h5 className="text-xl font-semibold mt-4">{benefit.title}</h5>
              <p className="text-gray-600 text-sm mt-2">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EmployeeBenefits;