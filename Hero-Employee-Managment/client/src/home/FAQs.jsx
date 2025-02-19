import React from "react";

const faqs = [
  { question: "What is Hero Employee Management?", answer: "Hero Employee Management is a platform designed to streamline HR processes, payroll, and employee workflow management efficiently." },
  { question: "How can I register an account?", answer: "You can sign up by visiting our registration page, filling in your details, and verifying your email address." },
  { question: "Can I manage payroll using this platform?", answer: "Yes! Our payroll system ensures accurate salary management, deductions, and payment tracking." },
  { question: "Is my data secure on this platform?", answer: "Absolutely! We use advanced security measures to protect your personal and company data." },
  { question: "Can I track employee work progress?", answer: "Yes, our platform provides real-time tracking and monitoring features to help HR and managers oversee tasks." },
];

const FAQs = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8"> FAQ </h2>
        
        <div className="join join-vertical w-full">
          {faqs.map((faq, idx) => (
            <div className="collapse collapse-arrow join-item border-base-300 border">
              <input type="radio" name="my-accordion-4" defaultChecked />
              <div className="collapse-title text-xl font-medium">{faq.question}</div>
              <div className="collapse-content">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQs;