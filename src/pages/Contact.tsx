
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Mail } from 'lucide-react';

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

// Define form schema with validation
const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(500, 'Message cannot exceed 500 characters')
});

// Define form field types
type FormValues = z.infer<typeof formSchema>;

export default function Contact() {
  const { toast } = useToast();
  
  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: ''
    }
  });

  // Handle form submission
  const onSubmit = (data: FormValues) => {
    console.log('Form submitted:', data);
    
    // In a real application, this would send the form data to a server
    // For now, we'll just show a toast notification
    toast({
      title: "Message Sent!",
      description: "Your message has been sent to the Strata Council. They will respond to you shortly.",
    });
    
    // Reset form
    form.reset();
  };

  return (
    <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center space-x-2 mb-6">
          <Mail className="h-6 w-6 text-spectrum-blue" />
          <h1 className="text-3xl font-bold">Contact the Strata Council</h1>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <p className="mb-6 text-gray-600">
            Have a question, concern, or suggestion? Fill out this form to contact the strata council directly. 
            We aim to respond to all inquiries within 2-3 business days.
          </p>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your full name" {...field} />
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
                        <Input type="email" placeholder="Your email address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <FormControl>
                      <Input placeholder="What is your message about?" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Please provide details of your inquiry or concern..." 
                        className="min-h-[150px]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Please be as specific as possible so we can address your concern efficiently.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="bg-spectrum-blue hover:bg-spectrum-blue/90 w-full md:w-auto">
                Send Message
              </Button>
            </form>
          </Form>
        </div>
        
        <div className="mt-8 bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Other Ways to Reach Us</h2>
          <div className="space-y-3">
            <p><strong>Emergency Contact:</strong> For building emergencies, please call the property manager at (555) 123-4567</p>
            <p><strong>Mail:</strong> Spectrum 4 Strata Council, 123 Building Street, Vancouver, BC</p>
            <p><strong>Office Hours:</strong> The strata office is open Monday-Friday, 9am-5pm</p>
          </div>
        </div>
      </div>
    </div>
  );
}
