"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { UserRole } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";
import RoleSelector from "./RoleSelector";
import { Separator } from "../ui/separator";
import LoaderSpinner from "./LoaderSpinner";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/userSlice";

const loginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(1, { message: "Password is required." }),
});

const LoginForm: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const registrationSuccess = searchParams.get("registration") === "success";
  const [authError, setAuthError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>(UserRole.PATIENT);
  const dispatch = useDispatch();

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginFormSchema>) => {
    try {
      setLoading(true);
      setAuthError(null);

      // Determine the endpoint based on selected role
      let endpoint = "";
      switch (selectedRole) {
        case UserRole.PATIENT:
          endpoint = "/api/user/login-patient";
          break;
        case UserRole.DOCTOR:
          endpoint = "/api/user/login-doctor";
          break;
        case UserRole.DIAGNOSTIC_CENTER:
          endpoint = "/api/user/login-dc";
          break;
        case UserRole.ADMIN:
          endpoint = "/api/user/login-admin";
          break;
        default:
          endpoint = "/api/user/login-patient";
      }

      // Make the API call to your backend
      const response = await fetch(`http://localhost:4000${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Store the auth token
        localStorage.setItem("token", data.token);
        localStorage.setItem("userRole", selectedRole);

        // Store user data in Redux
        dispatch(
          setUser({
            id: data.token,
            role: selectedRole,
            name: data.name,
            email: values.email,
          })
        );

        // Redirect based on role
        switch (selectedRole) {
          case UserRole.PATIENT:
            router.push("/dashboard/patient");
            break;
          case UserRole.DOCTOR:
            router.push("/dashboard/doctor");
            break;
          case UserRole.DIAGNOSTIC_CENTER:
            router.push("/dashboard/diagnostic-center");
            break;
          case UserRole.ADMIN:
            router.push("/dashboard/admin");
            break;
          default:
            router.push("/");
        }
      } else {
        // Show error message
        setAuthError(
          data.message || "Login failed. Please check your credentials."
        );
      }
    } catch (error) {
      console.error("Login error:", error);
      setAuthError("An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        {registrationSuccess && (
          <Alert className="mb-6 bg-green-50 text-green-800 border-green-200">
            <AlertDescription>
              Registration successful! Please login with your credentials.
            </AlertDescription>
          </Alert>
        )}
        {authError && (
          <Alert className="mb-6 bg-red-50 text-red-800 border-red-200">
            <AlertDescription>{authError}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-4">
          <RoleSelector
            selectedRole={selectedRole}
            setSelectedRole={setSelectedRole}
          />
          <Separator />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                  <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="your.email@example.com"
                      {...field}
                      />
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
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <LoaderSpinner message="Logging in..." color="white" /> : `Login as ${selectedRole}`}
            </Button>
          </form>
        </Form>
                    </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <div className="text-sm text-center text-gray-500">
          Don't have an account?{" "}
          <Link href="/auth/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
