import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Lato } from 'next/font/google';
import { Poppins } from 'next/font/google';
import ContactPage from "@/components/landing/contact";
import Model from "@/components/Model";
import GradientButton from "@/components/landing/GradientButton";


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
          <Button className={`text-lg p-7 px-10 font-medium rounded-md rounded-tl-3xl rounded-br-3xl ${poppins.className} transition-transform duration-350 shadow-lg hover:shadow-xl hover:-translate-y-2`} size="lg" asChild>
            <Link href="/login">Get Started</Link>
          </Button>
        </div>
      <Model />
      <div className="absolute left-0 bottom-0 bg-gray-300/20 backdrop-blur-md w-full p-14">
          <p className={`pl-72 text-xl text-gray-600 font-semibold ${lato.className}`}>
            Recuris is built to modernize healthcare by making medical data secure, accessible, and intelligent. 
            With blockchain-powered trust and AI-driven efficiency, it bridges the gap between patients, doctors, and hospitals—ensuring seamless collaboration without compromising privacy. 
            Recuris transforms how healthcare works—faster, smarter, and safer.
          </p>
          <div className="absolute left-12 -bottom-36 flex items-center">
            <Image src="/assets/heropills.svg" width={300} height={300} alt="Hero Pills" />
          </div>
        </div>
      </section>

      <section id="features" className="relative min-h-screen flex justify-center flex-col items-center py-20" >
        <h3 className={`font-semibold text-6xl  text-center ${poppins.className}`}>
          Our Features
        </h3>
        <Image src="/assets/features.svg" width={900} height={900} alt="Hero Pills" />
        <p className={`pl-72 text-5xl font-semibold ${lato.className} absolute right-16 top-96`}>
            Healthcare,<br /> Simplified.
          </p>
          <div className="absolute left-56 top-56 bg-gray-300/20 backdrop-blur-md w-96 p-8 rounded-3xl">
          <p className="font-bold text-2xl text-center">Electronic Health Records (EHR) </p> <br /><p className="font-semibold text-lg text-center">Your Medical History. <br /> Anytime, Anywhere</p>
          </div>
          <div className="absolute left-12 bottom-16 bg-gray-300/20 backdrop-blur-md w-96 p-8 rounded-3xl">
          <p className="font-bold text-2xl text-center"> Smart Booking</p> <br /><p className="font-semibold text-lg text-center">Book Doctor Visits <br /> in a Tap</p>
          </div>  
          <div className="absolute right-12 bottom-16 bg-gray-300/20 backdrop-blur-md w-96 p-8 rounded-3xl">
          <p className="font-bold text-2xl text-center">Emergency Care Approval </p> <br /><p className="font-semibold text-lg text-center">Authorized emergency access for critical care.</p>
          </div> 
      </section>
      {/* <section id="discover" className="relative min-h-screen bg-lime-800">
      <Button className={`absolute left-6 top-7 text-3xl p-10 font-semibold rounded-md rounded-tl-3xl rounded-br-3xl ${poppins.className}`} size="lg" asChild>
            <Link href="/login">Discover More</Link>
          </Button>
          <h3 className={`absolute top-28 left-96 p-8 font-semibold text-5xl text-center ${poppins.className}`}>Dashboard</h3>
          <p className="absolute font-bold text-3xl top-32 left-16 text-center">Your Smart Dashboard, <br /> Your Control Hub</p>
          <div className="absolute left-10 top-52 bg-gray-300/20 backdrop-blur-md w-96 p-3 rounded-3xl">
          <p className="font-bold text-xl text-left">For Doctors:  </p> <br /><p className="font-semibold text-lg text-left">Track patient records, appointments & insights in one place.</p>
          </div>
          <div className="absolute left-10 top-96 bg-gray-300/20 backdrop-blur-md w-96 p-3 rounded-3xl">
          <p className="font-bold text-xl text-left">For Doctors:  </p> <br /><p className="font-semibold text-lg text-left">Track patient records, appointments & insights in one place.</p>
          </div>
      </section> */}
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