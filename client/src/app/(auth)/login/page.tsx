import React from 'react';
import LoginForm from '@/components/form/LoginForm';

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen py-8">
      <div className="w-full mx-auto">
        <LoginForm />
      </div>
    </div>
  );
}