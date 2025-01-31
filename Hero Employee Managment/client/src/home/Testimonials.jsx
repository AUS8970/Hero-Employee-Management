import React from 'react';

const testimonialsData = [
  {
    name: "Tania Andrew",
    role: "Designer @ Google",
    image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1480&q=80",
    feedback: "I found solution to all my design needs from Creative Tim. I use them as a freelancer in my hobby projects for fun! And its really affordable, very humble guys !!!"
  },
  {
    name: "John Doe",
    role: "Developer @ Facebook",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1480&q=80",
    feedback: "Creative Tim offers amazing resources for developers. Their design templates are top-notch and saved me a lot of time!"
  },
  {
    name: "Sarah Smith",
    role: "Manager @ Amazon",
    image: "https://images.unsplash.com/photo-1532075925301-c2f535ee8c5e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1480&q=80",
    feedback: "Their customer support is fantastic! Always ready to help and solve issues promptly. Highly recommend their services!"
  },
  {
    name: "Michael Johnson",
    role: "Entrepreneur @ StartUp",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1480&q=80",
    feedback: "As a startup owner, I found their products invaluable. Great value for money and excellent quality!"
  },
  {
    name: "Emily Davis",
    role: "Marketer @ Shopify",
    image: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?ixlib=rb-1.2.1&auto=format&fit=crop&w=1480&q=80",
    feedback: "The best design tools I’ve used in a long time. Highly intuitive and the team is super supportive."
  },
  {
    name: "Robert Wilson",
    role: "Consultant @ Microsoft",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1480&q=80",
    feedback: "Creative Tim's templates have drastically improved the look and feel of my client presentations. They're a game changer!"
  }
];

const Testimonials = () => {
  return (
    <section className="p-8">
      <h2 className="text-3xl font-bold text-center mb-6">What Our Clients Say</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {testimonialsData.map((testimonial, index) => (
          <div key={index} className="flex w-full p-4 max-w-lg flex-col rounded-lg bg-white shadow-sm border border-slate-200 my-6">
            <div className="flex items-center gap-4 text-slate-800">
              <img src={testimonial.image} alt={testimonial.name} className="relative inline-block h-[58px] w-[58px] !rounded-full object-cover object-center" />
              <div className="flex w-full flex-col">
                <div className="flex items-center justify-between">
                  <h5 className="text-xl font-semibold text-slate-800">{testimonial.name}</h5>
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-yellow-600">
                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd"></path>
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-xs uppercase font-bold text-slate-500 mt-0.5">{testimonial.role}</p>
              </div>
            </div>
            <div className="mt-6">
              <p className="text-base text-slate-600 font-light leading-normal">
                &quot;{testimonial.feedback}&quot;
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;