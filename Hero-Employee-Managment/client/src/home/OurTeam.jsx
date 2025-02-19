import React from "react";

const teamMembers = [
  { id: 1, name: "John Doe", role: "CEO", image: "https://i.insider.com/67941d92eb4be2fff9a22475?width=700" },
  { id: 2, name: "Jane Smith", role: "HR Manager", image: "https://www.n2growth.com/wp-content/uploads/2019/08/happy-ceo-at-desk.jpg" },
  { id: 3, name: "Mike Johnson", role: "Software Engineer", image: "https://images.newrepublic.com/c9363f9a2eac2033da9be6af3e74cc3a809e2763.jpeg?auto=format&fit=crop&crop=faces&q=65&w=768&h=undefined&ar=3%3A2&ixlib=react-9.0.3&w=768" },
];

const OurTeam = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800">Meet Our Experts</h2>
        <p className="text-gray-600 mb-10">Our team of dedicated professionals</p>

        {/* Team Grid */}
        <div className="grid md:grid-cols-3 sm:grid-cols-1  gap-6 mx-10">
          {teamMembers.map((member) => (
            <div key={member.id} className="bg-white h-[270px] shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105">
              <img src={member.image} alt={member.name} className="w-40 h-40 mx-auto rounded-full" />
              <h3 className="text-lg font-semibold mt-4">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurTeam;