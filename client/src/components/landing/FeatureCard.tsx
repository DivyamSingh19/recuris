// FeatureSection.jsx
import React from 'react';
import { CircleArrowUp } from 'lucide-react';
import Image from 'next/image';

const FeatureCard = ({ title, subtitle, icon }: any) => {
  return (
    <div className="bg-white rounded-3xl shadow-md overflow-hidden max-w-xs mx-auto transition-transform duration-300 hover:transform hover:scale-105">
      <div className="p-6 flex flex-col items-center text-center">
        <div className="mb-6">
          {icon}
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600 mb-6">{subtitle}</p>
        <button className="w-full py-4 px-6 bg-primary text-white rounded-full flex items-end justify-items-end justify-center gap-2 text-lg font-semibold hover:bg-primary/80 transition-colors duration-300">
          <span>Explore Now</span>
          <CircleArrowUp className='rotate-45'/>
        </button>
      </div>
    </div>
  );
};

const FeatureSection = () => {
  const features = [
    {
      title: "Electronic Health Records (EHR)",
      subtitle: "Your Medical History, Anytime, Anywhere",
      icon: (
        <div className="relative w-64 h-64">
          <div className="absolute inset-0 z-20">
            <Image src="/assets/ehr.svg" width={800} height={800} alt="Hero Pills" className='scale-125'/>
          </div>
          
        </div>
      )
    },
    {
      title: "Smart OPD Booking System",
      subtitle: "Book Appointments And OPD On Your Fingertips",
      icon: (
        <div className="relative w-64 h-64">
          <div className="absolute inset-0 z-20">
            <Image src="/assets/booking.svg" width={600} height={600} alt="Hero Pills"/>
          </div>
          
        </div>
      )
    },
    {
      title: "Emergency Care Approval",
      subtitle: "Authorized emergency access for critical care.",
      icon: (
        <div className="relative w-64 h-64">
          <div className="absolute inset-0 z-20">
            <Image src="/assets/emergency.svg" width={600} height={600} alt="Hero Pills"/>
          </div>
          
        </div>
      )
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Healthcare at Your Fingertips</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Modern tools to manage your health conveniently and securely.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              title={feature.title}
              subtitle={feature.subtitle}
              icon={feature.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;