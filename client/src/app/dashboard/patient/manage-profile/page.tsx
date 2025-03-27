"use client"

import { useEffect, useState } from 'react'
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  HeartPulse, 
  MapPin 
} from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import Image from "next/image"
import { toast } from "sonner"

// Validation Schema
const profileSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number"),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
  bloodGroup: z.enum(["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]),
  gender: z.enum(["Male", "Female", "Other"]),
  address: z.object({
    street: z.string().min(3, "Street address is required"),
    city: z.string().min(2, "City is required"),
    state: z.string().min(2, "State is required"),
    postalCode: z.string().regex(/^\d{5,6}$/, "Invalid postal code"),
    country: z.string().min(2, "Country is required")
  })
})

const ManageProfile = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [profileImage, setProfileImage] = useState<string>("/metamask.png")

  useEffect(() => {
    // fetch userData and store them into the form
  }, [])
  

  // Initialize form with default or fetched user data
  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "+918765432100",
      dateOfBirth: "1995-06-15",
      bloodGroup: "O+",
      gender: "Male",
      address: {
        street: "123 Health Street",
        city: "Bangalore",
        state: "Karnataka",
        postalCode: "560001",
        country: "India"
      }
    }
  })

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const onSubmit = (data: z.infer<typeof profileSchema>) => {
    // Implement actual update logic here
    console.log("Profile Update Data:", data)
    toast.success("Profile Updated Successfully")
    setIsEditing(false)
  }

  return (
    <div className="container mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Manage Profile</h1>
        <Button 
          onClick={() => setIsEditing(!isEditing)}
          variant={isEditing ? "destructive" : "default"}
        >
          {isEditing ? "Cancel" : "Edit Profile"}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Image & Basic Info */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Profile Picture</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="relative mb-4">
              <Image 
                src={profileImage} 
                alt="Profile" 
                width={200} 
                height={200} 
                className="rounded-full object-contain bg-red-500"
              />
              {isEditing && (
                <label className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full cursor-pointer">
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden"
                    onChange={handleProfileImageChange}
                  />
                  Edit
                </label>
              )}
            </div>
            {!isEditing && (
              <div className="text-center">
                <h2 className="text-xl font-semibold">Name</h2>
                <p className="text-muted-foreground">Patient</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Profile Details Form */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                            <Input 
                              {...field} 
                              disabled={!isEditing}
                              placeholder="Full Name"
                              className="pl-10"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Email */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                            <Input 
                              {...field} 
                              disabled={!isEditing}
                              placeholder="Email Address"
                              className="pl-10"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Phone */}
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                            <Input 
                              {...field} 
                              disabled={!isEditing}
                              placeholder="Phone Number"
                              className="pl-10"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Date of Birth */}
                  <FormField
                    control={form.control}
                    name="dateOfBirth"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date of Birth</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                            <Input 
                              {...field} 
                              type="date"
                              disabled={!isEditing}
                              className="pl-10"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Blood Group */}
                  <FormField
                    control={form.control}
                    name="bloodGroup"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Blood Group</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                          disabled={!isEditing}
                        >
                          <FormControl>
                            <div className="relative">
                              <HeartPulse className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                              <SelectTrigger className="pl-10">
                                <SelectValue placeholder="Select Blood Group" />
                              </SelectTrigger>
                            </div>
                          </FormControl>
                          <SelectContent>
                            {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(group => (
                              <SelectItem key={group} value={group}>{group}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Gender */}
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gender</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                          disabled={!isEditing}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Gender" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Male">Male</SelectItem>
                            <SelectItem value="Female">Female</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Address Section */}
                <div className="space-y-4 mt-6">
                  <h3 className="text-lg font-semibold">Address Details</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Street */}
                    <FormField
                      control={form.control}
                      name="address.street"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Street Address</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                              <Input 
                                {...field} 
                                disabled={!isEditing}
                                placeholder="Street Address"
                                className="pl-10"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* City */}
                    <FormField
                      control={form.control}
                      name="address.city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              disabled={!isEditing}
                              placeholder="City"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* State */}
                    <FormField
                      control={form.control}
                      name="address.state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              disabled={!isEditing}
                              placeholder="State"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Postal Code */}
                    <FormField
                      control={form.control}
                      name="address.postalCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Postal Code</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              disabled={!isEditing}
                              placeholder="Postal Code"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Country */}
                    <FormField
                      control={form.control}
                      name="address.country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              disabled={!isEditing}
                              placeholder="Country"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {isEditing && (
                  <div className="flex justify-end space-x-4 mt-6">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">Save Changes</Button>
                  </div>
                )}
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ManageProfile