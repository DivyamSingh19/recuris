import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Patient, UserRole } from '@/types';
import { useRouter } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const patientFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters.' }),
  dateOfBirth: z.string().optional(),
  bloodType: z.string().optional(),
  allergies: z.string().optional(),
});

const PatientSignupForm: React.FC = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof patientFormSchema>>({
    resolver: zodResolver(patientFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: ''
    },
  });

  const onSubmit = async (values: z.infer<typeof patientFormSchema>) => {
    // try {
    //   // 1. Register the user with Supabase Auth
    //   const supabase = createClient();
    //   const { data: authData, error: authError } = await supabase.auth.signUp({
    //     email: values.email,
    //     password: values.password,
    //   });

    //   if (authError) throw authError;

    //   // 2. If registration successful, add user details to the patients table
    //   if (authData.user) {
    //     const patientData: Patient = {
    //       ...values,
    //       role: UserRole.PATIENT,
    //     };

    //     const { error: profileError } = await supabase
    //       .from('patients')
    //       .insert([{ 
    //         id: authData.user.id,
    //         ...patientData 
    //       }]);

    //     if (profileError) throw profileError;

    //     // Redirect to login or dashboard
    //     router.push('/auth/login?registration=success');
    //   }
    // } catch (error) {
    //   console.error('Error registering patient:', error);
    //   // Handle signup error
    // }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
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
                <Input type="email" placeholder="john.doe@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        <Button type="submit" className="w-full">Sign Up as Patient</Button>
      </form>
    </Form>
  );
};

export default PatientSignupForm;