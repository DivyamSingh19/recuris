"use client"
import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { ethers } from "ethers";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Admin, UserRole } from '@/types';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import LoaderSpinner from './LoaderSpinner';
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/userSlice";
import Image from 'next/image';

const adminFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters.' }),
  hospital_id: z.string().min(1, { message: 'Hospital ID is required.' }),
  hospital_name: z.string().min(1, { message: 'Hospital name is required.' }),
  walletAddress: z.string().min(42, { message: "Invalid wallet address." })
});

const AdminSignupForm: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const form = useForm<z.infer<typeof adminFormSchema>>({
    resolver: zodResolver(adminFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      hospital_id: '',
      hospital_name: '',
      walletAddress: ""
    },
  });

  // Function to connect to MetaMask
      const connectMetaMask = async () => {
        if (!window.ethereum) {
          toast.error("MetaMask not detected. Please install it.");
          return;
        }
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const accounts = await provider.send("eth_requestAccounts", []);
          if (accounts.length > 0) {
            form.setValue("walletAddress", accounts[0]);
            toast.success(`Connected: ${accounts[0]}`);
          }
        } catch (error) {
          console.error("MetaMask connection error:", error);
          toast.error("Failed to connect to MetaMask.");
        }
      };

  const onSubmit = async (values: z.infer<typeof adminFormSchema>) => {
        try {
          setIsLoading(true);
          
          const response = await fetch('http://localhost:4000/api/user/register-admin', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: values.name,
              email: values.email,
              password: values.password,
              h_id: values.hospital_id,
              hospital: values.hospital_name,
              walletAddress: values.walletAddress
            }),
          });
    
          const data = await response.json();
    
          if (data.success) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('role', UserRole.ADMIN);
            localStorage.setItem("walletAddress", data.metaData.walletAddress);
            localStorage.setItem("email", data.metaData.email);
            localStorage.setItem("name", data.metaData.name);
            localStorage.setItem("id", data.id);
            toast.success("Account created successfully");
            
            router.push('/dashboard/admin');

            dispatch(
              setUser({
                id: data.token,
                role: "admin",
                name: data.metaData.name,
                email: data.metaData.email,
                walletAddress: data.metaData.walletAddress,
              })
            );
          } else {
            toast.error("Error in creating account", data.message);
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
                <Input type="password" placeholder="••••••••" {...field} />
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
          <FormField
            control={form.control}
            name="walletAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Wallet Address</FormLabel>
                <FormControl>
                  <Input type="text" readOnly {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* MetaMask Wallet Connection */}
          <div className="flex flex-col items-center gap-2">
            <Button type="button" variant="secondary" onClick={connectMetaMask} className="w-full">
              {form.getValues("walletAddress") ? `Connected: ${form.getValues("walletAddress").slice(0, 6)}...${form.getValues("walletAddress").slice(-4)}` : (
                <div className="flex items-center gap-2">
                  <span>Connect to MetaMask</span>
                  <Image src="/metamask.svg" width={15} height={15} alt="Metamask Logo" />
                </div>
              )}
            </Button>
          </div>
        <Button type="submit" disabled={isLoading} className="w-full">{isLoading ? <LoaderSpinner message="Creating..." color="white" /> : "Signup as Admin"}</Button>
      </form>
    </Form>
  );
};

export default AdminSignupForm;