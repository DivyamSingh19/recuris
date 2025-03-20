import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Header />
      <section className="relative min-h-screen p-24">
        <div className="">
          <h1 className="text-6xl font-bold mb-4">RECURIS</h1>
          <h2 className="text-3xl font-semibold mb-8">Smarter Healthcare, Built For You.</h2>
          <Button className="text-lg p-6" size="lg" asChild>
            <Link href="/login">Get Started</Link>
          </Button>
        </div>
        <div className="absolute right-0 -top-[55px]">
          <Image src="/hero_img.png" width={800} height={800} alt="Hero" />
        </div>
        <div className="absolute left-0 bottom-0 bg-gray-300/20 backdrop-blur-md w-full p-24">
          <p className="pl-72 text-lg">Recuris is built to modernize healthcare by making medical data secure, accessible, and intelligent. With blockchain-powered trust and AI-driven efficiency, it bridges the gap between patients, doctors, and hospitals—ensuring seamless collaboration without compromising privacy. Recuris transforms how healthcare works—faster, smarter, and safer.</p>
          <div className="absolute left-25 -bottom-14 bg-red-200 w-[200px] h-[280px] flex items-center justify-center">200 x 280</div>
        </div>
      </section>

      <section id="features" className="min-h-screen">
        <h3 className="font-semibold text-3xl p-24 text-center">Our Features</h3>
      </section>

      <section id="appointments" className="min-h-screen bg-red-100">
        <h3 className="font-semibold text-3xl p-24 text-center">Appointments</h3>
      </section>

      <section id="contact" className="min-h-screen">
        <h3 className="font-semibold text-3xl p-24 text-center">Contact Us</h3>
      </section>

      <Footer />
    </>
  );
}
