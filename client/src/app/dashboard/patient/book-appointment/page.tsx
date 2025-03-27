"use client"
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { toast } from 'sonner';

// Define form schemas
const doctorAppointmentSchema = z.object({
  doctorId: z.string().min(1, { message: "Please select a doctor" }),
  date: z.date({
    required_error: "Please select a date",
  }),
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
});

const diagnosticAppointmentSchema = z.object({
  diagnosticCenterId: z.string().min(1, { message: "Please select a diagnostic center" }),
  date: z.date({
    required_error: "Please select a date",
  }),
});

type DoctorAppointmentFormValues = z.infer<typeof doctorAppointmentSchema>;
type DiagnosticAppointmentFormValues = z.infer<typeof diagnosticAppointmentSchema>;

interface Doctor {
  id: number;  // Changed from string to number
  name: string;
  email: string;
  hospital: string;
  h_id: string;
}

interface DiagnosticCenter {
  id: string;
  name: string;
  location: string;
}

export default function BookAppointmentPage() {
  const router = useRouter();
  const patientId = localStorage.getItem("id");
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [diagnosticCenters, setDiagnosticCenters] = useState<DiagnosticCenter[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize forms
  const doctorForm = useForm<DoctorAppointmentFormValues>({
    resolver: zodResolver(doctorAppointmentSchema),
    defaultValues: {
      doctorId: "",
      name: "",
      email: "",
    },
  });

  const diagnosticForm = useForm<DiagnosticAppointmentFormValues>({
    resolver: zodResolver(diagnosticAppointmentSchema),
    defaultValues: {
      diagnosticCenterId: "",
    },
  });

  // Fetch doctors and diagnostic centers when component mounts
  useEffect(() => {
    async function fetchData() {
      try {
        // Replace with your actual API endpoints
        const doctorsResponse = await axios.get('http://localhost:4000/api/appointment/fetchDoctors');
        const diagnosticCentersResponse = await axios.get('http://localhost:4000/api/appointment/fetchDiagnostiCenters');
      
        setDoctors(doctorsResponse.data);
        setDiagnosticCenters(diagnosticCentersResponse.data);
        console.log(doctorsResponse.data)
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error("Error: Failed to load doctors and diagnostic centers");
      }
    }
    
    fetchData();

  }, []);

  async function onDoctorSubmit(data: DoctorAppointmentFormValues) {
    if (!patientId) {
      toast.info("Error: Patient ID is missing");
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await axios.post('http://localhost:4000/api/appointment/appointment-doc', {
        patientId: 10,
        doctorId: parseInt(data.doctorId),
        date: data.date,
        name: data.name,
        email: data.email
      });
      
      toast.success("Doctor appointment booked successfully");
      
      // Redirect to appointments page or dashboard
      router.push('/patients/appointments');
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Failed to book appointment";
      toast("Error", errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  async function onDiagnosticSubmit(data: DiagnosticAppointmentFormValues) {
    if (!patientId) {
      toast.info("Error: Patient ID is missing");
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await axios.post('http://localhost:4000/api/appointment/appointment-dc', {
        patientId,
        diagnosticCenterId: data.diagnosticCenterId,
        date: data.date,
        createdAt: new Date(),
      });
      
      toast.success("Diagnostic appointment booked successfully");
      
      // Redirect to appointments page or dashboard
      router.push('/appointments');
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Failed to book appointment";
      toast.error("Error", errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-1">Book an Appointment</h1>
      <p className='text-muted-foreground mb-6'>Select a doctor or a diagnostic center and book your appointment</p>
      
      <Tabs defaultValue="doctor" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="doctor">Book Doctor Appointment</TabsTrigger>
          <TabsTrigger value="diagnostic">Book Diagnostic Center Appointment</TabsTrigger>
        </TabsList>
        
        <TabsContent value="doctor">
          <Card>
            <CardHeader>
              <CardTitle>Doctor Appointment</CardTitle>
              <CardDescription>
                Book an appointment with one of our qualified doctors.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...doctorForm}>
                <form onSubmit={doctorForm.handleSubmit(onDoctorSubmit)} className="space-y-6">
                  <FormField
                    control={doctorForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={doctorForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your email" type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={doctorForm.control}
                    name="doctorId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Select Doctor</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a doctor" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {doctors.map((doctor) => (
                              <SelectItem key={doctor.id} value={doctor.id.toString()}>
                                Dr. {doctor.name} - {doctor.hospital}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={doctorForm.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Appointment Date</FormLabel>
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => 
                            date < new Date() || 
                            date > new Date(new Date().setMonth(new Date().getMonth() + 1))
                          }
                          className="rounded-md border"
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Booking..." : "Book Doctor Appointment"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="diagnostic">
          <Card>
            <CardHeader>
              <CardTitle>Diagnostic Center Appointment</CardTitle>
              <CardDescription>
                Book an appointment at one of our diagnostic centers for tests.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...diagnosticForm}>
                <form onSubmit={diagnosticForm.handleSubmit(onDiagnosticSubmit)} className="space-y-6">
                  <FormField
                    control={diagnosticForm.control}
                    name="diagnosticCenterId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Select Diagnostic Center</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a diagnostic center" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {diagnosticCenters.map((center) => (
                              <SelectItem key={center.id} value={center.id}>
                                {center.name} - {center.location}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={diagnosticForm.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Appointment Date</FormLabel>
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => 
                            date < new Date() || 
                            date > new Date(new Date().setMonth(new Date().getMonth() + 3))
                          }
                          className="rounded-md border"
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Booking..." : "Book Diagnostic Appointment"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}