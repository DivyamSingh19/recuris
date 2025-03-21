"use client"
import React, { useEffect } from 'react';
import LoginForm from '@/components/form/LoginForm';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import LoginModel from '@/components/auth/LoginModel';
import Image from "next/image";

export default function LoginPage() {

  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("userRole")) {
      router.push("/");
    }
  }, [])
  

  return (
    <div className="relative flex items-center justify-center min-h-screen py-8">
      <div className="w-full mx-auto">
        <LoginForm />
      </div>
      <Button className='absolute top-5 left-5' variant="secondary" asChild>
        <Link href="/">Back to home</Link>
      </Button>
      <div className='absolute bottom-0 right-10'><Image src="/assets/illustartion_1.svg" width={600} height={600} alt="Illu" /></div>
      {/* <div className='absolute top-0 left-0'>
      <LoginModel />
      </div> */}
    </div>
  );
}