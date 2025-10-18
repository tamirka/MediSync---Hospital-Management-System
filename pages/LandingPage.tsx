import React, { useState } from 'react';
import { AppointmentsIcon, PatientsIcon, ReportsIcon, BillingIcon, PharmacyIcon } from '../components/Icons';

interface LandingPageProps {
  onLaunch: () => void;
}

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-gray-200 py-4">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center text-left text-lg font-medium text-gray-800 focus:outline-none"
            >
                <span>{question}</span>
                <svg
                    className={`w-5 h-5 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-96 mt-4' : 'max-h-0'
                }`}
            >
                <p className="text-gray-600">{answer}</p>
            </div>
        </div>
    );
};


const TestimonialCard: React.FC<{ quote: string, name: string, title: string, imageUrl: string }> = ({ quote, name, title, imageUrl }) => (
    <div className="bg-white p-6 rounded-lg shadow-lg text-center transform hover:-translate-y-2 transition-transform duration-300">
        <img src={imageUrl} alt={name} className="w-16 h-16 rounded-full mx-auto mb-4 border-2 border-primary" />
        <p className="text-gray-600 italic">"{quote}"</p>
        <p className="mt-4 font-bold text-gray-800">{name}</p>
        <p className="text-sm text-gray-500">{title}</p>
    </div>
);


const LandingPage: React.FC<LandingPageProps> = ({ onLaunch }) => {
  return (
    <div className="bg-base-100 font-sans">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-10 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-wider text-white">MediSync</h1>
          <button
            onClick={onLaunch}
            className="px-6 py-2 bg-white text-primary font-semibold rounded-full shadow-md hover:bg-gray-100 transition-colors"
          >
            Launch App
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-primary text-white py-32 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-teal-800 opacity-90"></div>
        {/* Subtle background pattern */}
        <div className="absolute inset-0 bg-hero-pattern opacity-5"></div>
        <style>{`.bg-hero-pattern { background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"); }`}</style>
        <div className="relative z-10 container mx-auto">
          <h2 className="text-5xl font-extrabold mb-4 leading-tight">Revolutionizing Hospital Management</h2>
          <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
            A seamless, intuitive, and powerful system designed to streamline hospital operations, enhance patient care, and empower medical professionals.
          </p>
          <button
            onClick={onLaunch}
            className="px-8 py-4 bg-white text-primary font-bold text-lg rounded-full shadow-lg hover:bg-gray-200 transform hover:scale-105 transition-transform duration-300"
          >
            Explore the Dashboard
          </button>
        </div>
      </section>
      
      {/* Features Bento Grid Section */}
      <section className="py-20 px-4 bg-gray-50">
          <div className="container mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">A Fully Integrated Platform</h2>
              <p className="text-gray-600 mb-12 max-w-2xl mx-auto">From patient intake to billing and reporting, MediSync brings every aspect of hospital management into a single, cohesive system.</p>
              <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-3 gap-6 text-left">
                  <div className="md:col-span-2 row-span-2 bg-white p-8 rounded-xl shadow-lg flex flex-col justify-between hover:shadow-2xl transition-shadow duration-300">
                      <div>
                        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-teal-100 text-primary mb-4">
                            <PatientsIcon className="w-6 h-6" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">Unified Patient Records</h3>
                        <p className="text-gray-600">Access complete patient histories, lab results, and medication records instantly and securely. Our centralized database ensures data integrity and immediate availability.</p>
                      </div>
                      <a href="#" onClick={(e) => e.preventDefault()} className="mt-4 font-semibold text-primary hover:underline">Learn More &rarr;</a>
                  </div>
                  <div className="md:col-span-1 row-span-1 bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                      <div className="flex items-center justify-center h-12 w-12 rounded-full bg-teal-100 text-primary mb-4">
                            <AppointmentsIcon className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">Smart Scheduling</h3>
                      <p className="text-gray-600 text-sm">Effortlessly manage appointments for patients and doctors.</p>
                  </div>
                  <div className="md:col-span-1 row-span-2 bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                      <div className="flex items-center justify-center h-12 w-12 rounded-full bg-teal-100 text-primary mb-4">
                            <ReportsIcon className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">Insightful Analytics</h3>
                      <p className="text-gray-600">Generate detailed reports and visualize data to make informed decisions and improve hospital performance with our powerful analytics dashboard.</p>
                  </div>
                  <div className="md:col-span-1 row-span-1 bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                      <div className="flex items-center justify-center h-12 w-12 rounded-full bg-teal-100 text-primary mb-4">
                            <BillingIcon className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">Streamlined Billing</h3>
                      <p className="text-gray-600 text-sm">Automate invoicing, track payments, and manage financial records.</p>
                  </div>
                   <div className="md:col-span-1 row-span-1 bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                      <div className="flex items-center justify-center h-12 w-12 rounded-full bg-teal-100 text-primary mb-4">
                            <PharmacyIcon className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">Pharmacy Management</h3>
                      <p className="text-gray-600 text-sm">Monitor medication inventory and manage prescriptions seamlessly.</p>
                  </div>
              </div>
          </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Get Started in 3 Easy Steps</h2>
            <p className="text-gray-600 mb-12">Streamline your workflow in minutes.</p>
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 relative">
                {/* Dashed line for desktop */}
                <div className="hidden md:block absolute top-1/2 left-0 w-full h-px border-t-2 border-dashed border-gray-300 -translate-y-1/2 -mt-4"></div>
                
                <div className="relative flex flex-col items-center z-10">
                    <div className="flex items-center justify-center w-20 h-20 bg-white border-4 border-primary rounded-full text-primary text-2xl font-bold shadow-lg">1</div>
                    <h3 className="mt-4 text-xl font-semibold">Launch the App</h3>
                    <p className="mt-2 text-gray-500 max-w-xs">Access the dashboard with one click.</p>
                </div>
                <div className="relative flex flex-col items-center z-10">
                    <div className="flex items-center justify-center w-20 h-20 bg-white border-4 border-primary rounded-full text-primary text-2xl font-bold shadow-lg">2</div>
                    <h3 className="mt-4 text-xl font-semibold">Manage Your Data</h3>
                    <p className="mt-2 text-gray-500 max-w-xs">Add patients, schedule appointments, and update records.</p>
                </div>
                <div className="relative flex flex-col items-center z-10">
                    <div className="flex items-center justify-center w-20 h-20 bg-white border-4 border-primary rounded-full text-primary text-2xl font-bold shadow-lg">3</div>
                    <h3 className="mt-4 text-xl font-semibold">Gain Insights</h3>
                    <p className="mt-2 text-gray-500 max-w-xs">Use analytics to track performance and improve care.</p>
                </div>
            </div>
        </div>
      </section>


      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-gray-50">
         <div className="container mx-auto text-center">
           <h2 className="text-3xl font-bold text-gray-800 mb-12">Trusted by Healthcare Professionals</h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <TestimonialCard 
                    quote="MediSync has transformed our daily operations. It's intuitive, fast, and has everything we need."
                    name="Dr. Evelyn Reed"
                    title="Chief of Cardiology"
                    imageUrl="https://randomuser.me/api/portraits/women/68.jpg"
                />
                 <TestimonialCard 
                    quote="Managing patient data has never been easier. The platform is secure and incredibly user-friendly."
                    name="Dr. Ben Carter"
                    title="Pediatrics Specialist"
                    imageUrl="https://randomuser.me/api/portraits/men/67.jpg"
                />
                 <TestimonialCard 
                    quote="The reporting tools give us invaluable insights into our hospital's efficiency. A game-changer."
                    name="Olivia Chen"
                    title="Hospital Administrator"
                    imageUrl="https://randomuser.me/api/portraits/women/62.jpg"
                />
           </div>
         </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-20 px-4">
          <div className="container mx-auto max-w-3xl">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Frequently Asked Questions</h2>
              <FAQItem
                  question="Is MediSync secure and HIPAA compliant?"
                  answer="Absolutely. We prioritize data security and are fully HIPAA compliant. All data is encrypted both in transit and at rest, and our infrastructure is built with multiple layers of protection."
              />
              <FAQItem
                  question="Can MediSync integrate with our existing lab systems?"
                  answer="Yes, our platform is designed for flexibility. We offer robust API endpoints to facilitate seamless integration with a wide range of existing laboratory and imaging systems."
              />
              <FAQItem
                  question="What kind of support do you offer?"
                  answer="We provide 24/7 technical support via email and phone. We also offer comprehensive onboarding and training for all new hospital staff to ensure a smooth transition."
              />
              <FAQItem
                  question="Is there a mobile app?"
                  answer="A dedicated mobile application for both iOS and Android is currently in the final stages of development and will be released soon, allowing you to manage your hospital on the go."
              />
          </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 bg-primary">
          <div className="container mx-auto text-center text-white">
              <h2 className="text-4xl font-bold mb-4">Ready to Enhance Your Hospital's Efficiency?</h2>
              <p className="text-teal-100 mb-8 max-w-xl mx-auto">Join the growing number of modern healthcare facilities leveraging MediSync to deliver superior patient care.</p>
              <button
                  onClick={onLaunch}
                  className="px-8 py-4 bg-white text-primary font-bold text-lg rounded-full shadow-lg hover:bg-gray-200 transform hover:scale-105 transition-transform duration-300"
              >
                  Launch the Dashboard Now
              </button>
          </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto text-center">
            <p>&copy; 2023 MediSync. All rights reserved.</p>
            <p className="text-sm text-gray-400 mt-1">Your Partner in Modern Healthcare</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
