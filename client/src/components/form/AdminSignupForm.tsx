import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Doctor, UserRole } from '@/types';
import { useRouter } from 'next/navigation';

const adminFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters.' }),
  hospital_id: z.string().min(1, { message: 'Hospital ID is required.' }),
  hospital_name: z.string().min(1, { message: 'Hospital name is required.' }),
  specialization: z.string().min(1, { message: 'Specialization is required.' }),
  license_number: z.string().min(1, { message: 'License number is required.' }),
  years_of_experience: z.string().transform(val => parseInt(val) || 0).optional(),
});

const AdminSignupForm: React.FC = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof adminFormSchema>>({
    resolver: zodResolver(adminFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      hospital_id: '',
      hospital_name: ''
    },
  });

  const onSubmit = async (values: z.infer<typeof adminFormSchema>) => {
    // try {
    //   // 1. Register the user with Supabase Auth
    //   const supabase = createClient();
    //   const { data: authData, error: authError } = await supabase.auth.signUp({
    //     email: values.email,
    //     password: values.password,
    //   });

    //   if (authError) throw authError;

    //   // 2. If registration successful, add user details to the doctors table
    //   if (authData.user) {
    //     const doctorData: Doctor = {
    //       ...values,
    //     //   years_of_experience: parseInt(values.years_of_experience || '0'),
    //       role: UserRole.DOCTOR,
    //     };

    //     const { error: profileError } = await supabase
    //       .from('doctors')
    //       .insert([{ 
    //         id: authData.user.id,
    //         ...doctorData 
    //       }]);

    //     if (profileError) throw profileError;

    //     // Redirect to login or dashboard
    //     router.push('/auth/login?registration=success');
    //   }
    // } catch (error) {
    //   console.error('Error registering doctor:', error);
    //   // Handle signup error
    // }
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
            name="hospital_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hospital ID</FormLabel>
                <FormControl>
                  <Input placeholder="H12345" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="hospital_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hospital Name</FormLabel>
                <FormControl>
                  <Input placeholder="General Hospital" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-full">Sign Up as Admin</Button>
      </form>
    </Form>
  );
};

export default AdminSignupForm;