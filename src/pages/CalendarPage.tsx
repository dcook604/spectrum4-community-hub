
import React, { useState, useEffect } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { Plus, CalendarIcon } from "lucide-react";
import { useAdminAuth } from "@/components/AdminAuth";
import { useToast } from "@/hooks/use-toast";

// Define the Event type
interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  date: Date;
  createdAt: Date;
}

// Form schema for event creation
const eventFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  date: z.date({
    required_error: "Please select a date",
  })
});

type EventFormValues = z.infer<typeof eventFormSchema>;

export default function CalendarPage() {
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { isAuthenticated } = useAdminAuth();
  const { toast } = useToast();

  // Load events from localStorage on component mount
  useEffect(() => {
    const savedEvents = localStorage.getItem('calendarEvents');
    if (savedEvents) {
      try {
        // Parse the saved events and convert date strings back to Date objects
        const parsedEvents = JSON.parse(savedEvents).map((event: any) => ({
          ...event,
          date: new Date(event.date),
          createdAt: new Date(event.createdAt)
        }));
        setEvents(parsedEvents);
      } catch (error) {
        console.error("Error parsing saved events:", error);
        toast({
          title: "Error",
          description: "Could not load saved events",
          variant: "destructive",
        });
      }
    }
  }, [toast]);

  // Form setup using react-hook-form
  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      title: "",
      description: "",
      date: new Date(),
    }
  });

  // Handler for form submission
  const onSubmit = (values: EventFormValues) => {
    const newEvent: CalendarEvent = {
      id: crypto.randomUUID(),
      title: values.title,
      description: values.description || "",
      date: values.date,
      createdAt: new Date()
    };

    // Add the new event to the events array
    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);

    // Save the updated events to localStorage
    localStorage.setItem('calendarEvents', JSON.stringify(updatedEvents));

    // Show success toast
    toast({
      title: "Event added",
      description: `Event "${values.title}" has been added to ${format(values.date, 'MMMM d, yyyy')}`,
    });

    // Reset form and close dialog
    form.reset();
    setIsDialogOpen(false);
  };

  // Function to get events for a specific day
  const getDayEvents = (day: Date) => {
    return events.filter(event => 
      event.date.getDate() === day.getDate() &&
      event.date.getMonth() === day.getMonth() &&
      event.date.getFullYear() === day.getFullYear()
    );
  };

  // Get events for selected day
  const selectedDayEvents = selectedDay ? getDayEvents(selectedDay) : [];

  // Render a dot on calendar days with events
  const dayWithEventClassName = (date: Date) => {
    const hasEvent = getDayEvents(date).length > 0;
    return hasEvent ? "relative after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-1.5 after:h-1.5 after:bg-spectrum-800 after:rounded-full" : "";
  };

  return (
    <div className="container mx-auto p-4 md:p-8 space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl font-bold text-spectrum-800">Spectrum 4 Calendar</CardTitle>
              <CardDescription>View upcoming events and important dates</CardDescription>
            </div>
            {isAuthenticated && (
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="default" className="bg-spectrum-800 hover:bg-spectrum-900">
                    <Plus className="mr-1 h-4 w-4" />
                    Add Event
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Calendar Event</DialogTitle>
                  </DialogHeader>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                              <Input placeholder="Event title" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description (optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="Event description" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Date</FormLabel>
                            <FormControl>
                              <div className="grid gap-2">
                                <Button
                                  variant={"outline"}
                                  className="w-full pl-3 text-left font-normal"
                                  type="button"
                                  onClick={() => setIsDialogOpen(true)}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  className="rounded-md border pointer-events-auto"
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="flex justify-end gap-2">
                        <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button type="submit" className="bg-spectrum-800 hover:bg-spectrum-900">
                          Save Event
                        </Button>
                      </div>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-6">
          <div>
            <Calendar
              mode="single"
              selected={selectedDay}
              onSelect={setSelectedDay}
              className="p-3 pointer-events-auto"
              modifiersClassNames={{
                selected: "bg-spectrum-800 text-white hover:bg-spectrum-900",
              }}
              modifiers={{
                dayWithEvent: (date) => getDayEvents(date).length > 0,
              }}
              classNames={{
                day_selected: "bg-spectrum-800 text-white hover:bg-spectrum-900",
                day: (date) => dayWithEventClassName(date),
              }}
            />
          </div>
          
          <div className="md:border-l md:pl-6">
            <div className="mb-4">
              <h3 className="text-lg font-medium">
                Events for {selectedDay ? format(selectedDay, 'MMMM d, yyyy') : 'No date selected'}
              </h3>
            </div>
            
            {selectedDayEvents.length > 0 ? (
              <div className="space-y-4">
                {selectedDayEvents.map((event) => (
                  <Card key={event.id}>
                    <CardContent className="p-4">
                      <h4 className="font-medium">{event.title}</h4>
                      {event.description && (
                        <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                      )}
                      <p className="text-xs text-gray-500 mt-2">
                        Added on {format(event.createdAt, 'MMM d, yyyy')}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No events scheduled for this day.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
