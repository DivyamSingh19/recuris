import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Lato } from 'next/font/google';
import { Poppins } from 'next/font/google';


const lato = Lato({ subsets: ['latin'], weight: ['400', '700'] });
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700'] });


export default function Home() {
  return (
    <>
      <Header />
      <section className="relative min-h-screen p-24">
        <div>
          <h1 className={`text-6xl font-bold mb-4 ${poppins.className}`}>RECURIS</h1>
          <h2 className={`text-3xl font-semibold mb-8 ${lato.className}`}>
            Smarter Healthcare, Built For You.
          </h2>
          <Button className={`text-xl p-6 font-semibold rounded-md rounded-tl-3xl rounded-br-3xl ${poppins.className}`} size="lg" asChild>
            <Link href="/login">Get Started</Link>
          </Button>
        </div>
        <div className="absolute right-0 -top-[55px]">
          <Image src="/hero_img.png" width={800} height={800} alt="Hero" />
        </div>
        <div className="absolute left-0 bottom-0 bg-gray-300/20 backdrop-blur-md w-full p-14">
          <p className={`pl-72 text-2xl font-semibold ${lato.className}`}>
            Recuris is built to modernize healthcare by making medical data secure, accessible, and intelligent. 
            With blockchain-powered trust and AI-driven efficiency, it bridges the gap between patients, doctors, and hospitals—ensuring seamless collaboration without compromising privacy. 
            Recuris transforms how healthcare works—faster, smarter, and safer.
          </p>
          <div className="absolute left-10 -bottom-44 flex items-center">
            <Image src="/assets/heropills.svg" width={400} height={400} alt="Hero Pills" />
          </div>
        </div>
      </section>

      <section id="features" className="relative min-h-screen flex justify-center flex-col items-center py-20" >
        <h3 className={`font-semibold text-6xl  text-center ${poppins.className}`}>
          Our Features
        </h3>
        <Image src="/assets/herofeature.svg" width={900} height={900} alt="Hero Pills" />
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
      <section id="appointments" className="min-h-screen bg-red-100">
        <h3 className={`font-semibold text-5xl text-center ${lato.className}`}>
          Appointments
        </h3>
      </section>

      <section id="contact" className="min-h-screen">
        <h3 className={`font-semibold text-3xl p-24 text-center ${lato.className}`}>
          Contact Us
        </h3>
      </section>

      <Footer />
    </>
  );
}
