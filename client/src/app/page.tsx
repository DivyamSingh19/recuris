import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Lato } from 'next/font/google';
import { Poppins } from 'next/font/google';
import ContactPage from "@/components/landing/contact";
 
 
import FeatureSection from "@/components/landing/FeatureCard";


const lato = Lato({ subsets: ['latin'], weight: ['400', '700'] });
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700'] });


export default function Home() {
  return (
    <>
      <Header />
      <section className="relative bg-gray-100 min-h-screen">
      <div className="absolute top-36 left-20 z-10 max-w-xl">
          <h1 className={`text-5xl font-bold mb-4 leading-[1.2] ${poppins.className}`}><span className="text-primary">Protect</span> Your Health, <br /> Own Your <span className="text-primary">Data</span>.</h1>
          <h2 className={`text-xl text-gray-700 font-semibold mb-8 ${lato.className}`}>
          Recuris is built to modernize healthcare by making medical data secure, accessible, and intelligent.
          </h2>
          <Button className={`text-lg p-7 px-10 font-medium rounded-md rounded-tl-3xl rounded-br-3xl ${poppins.className} transition-transform duration-450 ease-in-out shadow-lg hover:shadow-xl hover:-translate-y-2`} size="lg" asChild>
            <Link href="/login">Get Started</Link>
          </Button>
        </div>
       
      
      </section>

      <section id="features" className="relative min-h-screen flex justify-center flex-col items-center py-20" >
        <h3 className={`font-semibold text-5xl  text-center ${poppins.className}`}>
          Our Features
        </h3>
        <Image src="/assets/features.svg" width={900} height={900} alt="Hero Pills" />
        <p className={`pl-72 text-5xl font-semibold ${lato.className} absolute right-16 top-96`}>
            Healthcare,<br /> Simplified.
          </p>
          <div className="absolute left-72 top-56 bg-gray-300/20 backdrop-blur-md w-96 p-8 rounded-3xl">
          <p className="font-bold text-2xl text-center">Electronic Health Records (EHR) </p> <br /><p className="font-semibold text-lg text-center">Your Medical History. <br /> Anytime, Anywhere</p>
          </div>
          <div className="absolute left-14 bottom-20 bg-gray-300/20 backdrop-blur-md w-96 p-8 rounded-3xl">
          <p className="font-bold text-2xl text-center"> Smart Booking</p> <br /><p className="font-semibold text-lg text-center">Book Doctor Visits <br /> in a Tap</p>
          </div>  
          <div className="absolute right-12 bottom-16 bg-gray-300/20 backdrop-blur-md w-96 p-8 rounded-3xl">
          <p className="font-bold text-2xl text-center">Emergency Care Approval </p> <br /><p className="font-semibold text-lg text-center">Authorized emergency access for critical care.</p>
          </div> 
      </section>
      <FeatureSection />
      {
      <section id="dashboard" className="relative min-h-screen bg-white px-10 py-20">
        {/* Dashboard Heading */}
        <h3 className={`text-center font-semibold  text-5xl text-black ${poppins.className}`}>Dashboard</h3>

        {/* Subheading */}
        <p className={`"text-5xl font-bold text-black text-center mt-4" ${lato.className} absolute top-32 left-40`}>
      Your Smart Dashboard, <br /> Your Control Hub
        </p>

        {/* Left Side Content (User Benefits) */}
        <div className="absolute left-24 top-52 w-96 space-y-6 z-10">
        {/* For Doctors */}
        <div className="bg-gray-100/60 shadow-lg p-4 rounded-2xl backdrop-blur">
          <p className="font-bold text-xl text-black">For Doctors:</p>
          <p className="font-semibold text-lg text-gray-700">
            Track patient records, appointments & insights in one place.
          </p>
        </div>

        {/* For Patients */}
        <div className="bg-gray-100/60 shadow-lg p-4 rounded-2xl backdrop-blur">
          <p className="font-bold text-xl text-black">For Patients:</p>
          <p className="font-semibold text-lg text-gray-700">
            View prescriptions, reports & upcoming consultations.
          </p>
        </div>

        {/* For Admins */}
        <div className="bg-gray-100/60 shadow-lg p-4 rounded-2xl backdrop-blur">
          <p className="font-bold text-xl text-black">For Admins:</p>
          <p className="font-semibold text-lg text-gray-700">
            Manage users, workflows & reports with ease.
          </p>
        </div>
        
        
        
      </div>
      <div className="absolute -bottom-24 left-16 ">
        <Image src="/assets/dashboard_pill.svg" width={400} height={400} alt="Hero Pills"/>
        </div>

        {/* Right Side - Illustration & Dashboard */}
        <div className="absolute right-24 top-2 bottom-4 flex flex-col items-center">
          <div>
            <Image src="/assets/dashboarddoc.svg" width={500} height={500} alt="Hero Pills" className="-mt-28" />
          </div>
          <div>
            <Image src="/assets/dashboard.svg" width={600} height={600} alt="Hero Pills" className="-mt-72"/>
          </div>
        </div>

        {/* CTA Button */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <button className="bg-[#8C4BB8] text-white text-xl font-semibold py-3 px-8 rounded-xl shadow-md hover:bg-[#773AA6]">
          <Link href="/login">Explore Dashboard</Link>
        </button>
        </div>
      </section>}
      <section id="appointments" className="min-h-screen flex flex-col bg-sidebar items-center justify-center gap-4 py-16">
        <h3 className={`font-semibold text-5xl text-center ${poppins.className}`}>
          Appointments
        </h3>
        <p className="text-xl font-medium mb-10">Seamless Consultations, Anytime, Anywhere</p>
        <Image src="/assets/appointments.svg" width={1100} height={1100} alt="Appointments" className="drop-shadow-xl" />
        <Button size={"lg"} className="p-6 text-lg px-12 mt-10" asChild><Link href="/login">Book Appointments</Link></Button>
      </section>

      <section id="contact" className="pt-10">
        <ContactPage />
      </section>

      <Footer />
    </>
  );
}