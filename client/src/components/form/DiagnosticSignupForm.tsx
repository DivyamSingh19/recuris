"use client"
import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { DiagnosticCenter, UserRole } from '@/types';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const diagnosticFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters.' }),
  specialization: z.string().min(1, { message: 'Specialization is required.' }),
  phone_number: z.string().min(1, { message: 'License number is required.' }),
  location: z.string().min(1, { message: 'Location is required.' }),
});

const DiagnosticSignupForm: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof diagnosticFormSchema>>({
    resolver: zodResolver(diagnosticFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      specialization: '',
      phone_number: '',
      location: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof diagnosticFormSchema>) => {
      try {
        setIsLoading(true);
        
        const response = await fetch('http://localhost:4000/api/user/register-dc', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: values.name,
            email: values.email,
            password: values.password,
            specialization: values.specialization,
            phoneNumber: values.phone_number,
            location: values.location,
          }),
        });
  
        const data = await response.json();
  
        if (data.success) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user as DiagnosticCenter));
          localStorage.setItem('role', UserRole.DIAGNOSTIC_CENTER);
          toast.success("Account created successfully");
          
          router.push('/dashboard/diagnostic-center');
        } else {
          toast.error(`Error in creating account`);
          console.error('Registration error:', data.message);
        }
      } catch (error: any) {
        console.error('Registration error:', error);
        toast.error(`Error in creating account: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Dr. Jane Smith" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="jane.smith@hospital.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="specialization"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Specialization</FormLabel>
                <FormControl>
                  <Input placeholder="Cardiology" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="7894541130" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Mira Road" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading} className="w-full">{isLoading ? "Loading..." : "Sign Up as Diagnostic Center"}</Button>
      </form>
    </Form>
  );
};

export default DiagnosticSignupForm;