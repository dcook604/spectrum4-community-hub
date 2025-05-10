
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { AdminAuthProvider, useAdminAuth } from "@/components/AdminAuth";
import { useToast } from "@/hooks/use-toast";
import { CalendarWithEvents } from "@/components/calendar/CalendarWithEvents";
import { EventList } from "@/components/calendar/EventList";
import { EventForm, eventFormSchema, EventFormValues } from "@/components/calendar/EventForm";

// Define the Event type
interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  date: Date;
  createdAt: Date;
}

const CalendarPageContent = () => {
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
      description: `Event "${values.title}" has been added successfully`,
    });

    // Reset form and close dialog
    form.reset();
    setIsDialogOpen(false);
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
                  <EventForm 
                    form={form} 
                    onSubmit={onSubmit} 
                    onCancel={() => setIsDialogOpen(false)} 
                  />
                </DialogContent>
              </Dialog>
            )}
          </div>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-6">
          <div>
            <CalendarWithEvents 
              selectedDay={selectedDay}
              setSelectedDay={setSelectedDay}
              events={events}
            />
          </div>
          
          <EventList 
            selectedDay={selectedDay} 
            events={events} 
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default function CalendarPage() {
  return (
    <AdminAuthProvider>
      <CalendarPageContent />
    </AdminAuthProvider>
  );
}
