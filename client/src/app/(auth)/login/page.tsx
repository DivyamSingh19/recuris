"use client"
import React, { useEffect } from 'react';
import LoginForm from '@/components/form/LoginForm';
import { useRouter } from 'next/navigation';

export default function LoginPage() {

  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("userRole")) {
      router.push("/");
    }
  }, [])
  

  return (
    <div className="flex items-center justify-center min-h-screen py-8">
      <div className="w-full mx-auto">
        <LoginForm />
      </div>
    </div>
  );
}