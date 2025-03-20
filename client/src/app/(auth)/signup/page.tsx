'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UserRole } from '@/types';
import RoleSelector from '@/components/form/RoleSelector';
import PatientSignupForm from '@/components/form/PatientSignupForm';
import DoctorSignupForm from '@/components/form/DoctorSignupForm';
import Link from 'next/link';
import AdminSignupForm from '@/components/form/AdminSignupForm';
import DiagnosticSignupForm from '@/components/form/DiagnosticSignupForm';
import { Separator } from '@/components/ui/separator';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function SignupPage() {
  const [selectedRole, setSelectedRole] = useState<UserRole>(UserRole.PATIENT);
  const router = useRouter();
  
    useEffect(() => {
      if (localStorage.getItem("token")) {
        router.push("/");
      }
    }, [])

  const renderFormByRole = () => {
    switch (selectedRole) {
      case UserRole.PATIENT:
        return <PatientSignupForm />;
      case UserRole.DOCTOR:
        return <DoctorSignupForm />;
      case UserRole.DIAGNOSTIC_CENTER:
        return <DiagnosticSignupForm />;
      case UserRole.ADMIN:
        return <AdminSignupForm />;
      default:
        return <PatientSignupForm />;
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen py-8">
      <Button className='absolute top-5 left-5' variant="secondary" asChild>
        <Link href="/">Back to home</Link>
      </Button>
      <div className="w-full max-w-lg space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className='text-2xl'>Create an Account</CardTitle>
            <CardDescription>Sign up to access the healthcare platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <RoleSelector selectedRole={selectedRole} setSelectedRole={setSelectedRole} />
              <Separator />
              {renderFormByRole()}
              <div className="text-sm text-center text-gray-500">
                Already have an account?{' '}
                <Link href="/login" className="text-blue-600 hover:underline">
                  Login
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}