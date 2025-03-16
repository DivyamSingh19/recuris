'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UserRole } from '@/types';
import RoleSelector from '@/components/form/RoleSelector';
import PatientSignupForm from '@/components/form/PatientSignupForm';
import DoctorSignupForm from '@/components/form/DoctorSignupForm';
import Link from 'next/link';
import AdminSignupForm from '@/components/form/AdminSignupForm';
import DiagnosticSignupForm from '@/components/form/DiagnosticSignupForm';

export default function SignupPage() {
  const [selectedRole, setSelectedRole] = useState<UserRole>(UserRole.PATIENT);

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
    <div className="container flex items-center justify-center min-h-screen py-8">
      <div className="w-full max-w-md space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Create an Account</CardTitle>
            <CardDescription>Sign up to access the healthcare platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <RoleSelector selectedRole={selectedRole} setSelectedRole={setSelectedRole} />
              {renderFormByRole()}
              <div className="text-sm text-center text-gray-500 pt-4">
                Already have an account?{' '}
                <Link href="/auth/login" className="text-blue-600 hover:underline">
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