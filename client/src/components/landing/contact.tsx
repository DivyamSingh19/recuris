"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Send } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your form submission logic here
  };

  return (
    <div className="min-h-screen">
      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 md:px-8 py-12">
        {/* Contact Title */}
        <div className="mb-12 relative">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter">
            CONTACT US
          </h1>

          {/* Contact Info Card */}
          <Card className="absolute right-0 top-1/2 transform -translate-y-1/2 md:translate-y-0 md:top-0 bg-purple-200 text-gray-700 border-none max-w-xs">
            <CardContent className="p-4">
              <div className="space-y-2">
                <h3 className="font-medium">RECURIS</h3>
                <p>(555) 123-4567</p>
                <p className="uppercase">recuris@gmail.com</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <Input
              type="text"
              name="name"
              placeholder="Name"
              className="h-14 rounded-3xl bg-gray-100 border-none"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="md:col-span-1">
            <Input
              type="email"
              name="email"
              placeholder="E-mail"
              className="h-14 rounded-3xl bg-gray-100 border-none"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="md:col-span-1">
            <Input
              type="text"
              name="subject"
              placeholder="Subject"
              className="h-14 rounded-3xl bg-gray-100 border-none"
              value={formData.subject}
              onChange={handleChange}
            />
          </div>
          <div className="md:col-span-1 md:row-span-2 flex items-end">
            <Button 
              type="submit" 
              className="w-full h-full aspect-square rounded-3xl bg-purple-300 hover:bg-purple-400 text-white"
            >
              <Send className="h-6 w-6" />
              <span className="ml-2">Send</span>
            </Button>
          </div>
          <div className="md:col-span-3">
            <Textarea
              name="message"
              placeholder="Message"
              className="min-h-32 rounded-3xl bg-gray-100 border-none p-6"
              value={formData.message}
              onChange={handleChange}
            />
          </div>
        </form>
      </main>
    </div>
  );
}