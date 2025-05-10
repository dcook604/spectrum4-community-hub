
import React from 'react';
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import * as z from "zod";

// Form schema for event creation
export const eventFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  date: z.date({
    required_error: "Please select a date",
  })
});

export type EventFormValues = z.infer<typeof eventFormSchema>;

interface EventFormProps {
  form: UseFormReturn<EventFormValues>;
  onSubmit: (values: EventFormValues) => void;
  onCancel: () => void;
}

export const EventForm: React.FC<EventFormProps> = ({ form, onSubmit, onCancel }) => {
  return (
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
                    variant="outline"
                    className="w-full pl-3 text-left font-normal flex justify-between items-center"
                    type="button"
                    onClick={() => document.getElementById('date-calendar')?.focus()}
                  >
                    {field.value ? (
                      format(field.value, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                  <div className="relative">
                    <Calendar
                      id="date-calendar"
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      className="rounded-md border pointer-events-auto"
                      initialFocus
                    />
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" className="bg-spectrum-800 hover:bg-spectrum-900">
            Save Event
          </Button>
        </div>
      </form>
    </Form>
  );
};
