"use client"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PatientPage() {

  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("userRole")) {
      router.push("/login");
    }
  }, [])
  

    return (
      <div>
        <h1>Common Dashboard</h1>
        <h2>We'll use this to redirect user to specific dashboard</h2>
      </div>
    );
  }