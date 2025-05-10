
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";

interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  date: Date;
  createdAt: Date;
}

interface EventListProps {
  selectedDay: Date | undefined;
  events: CalendarEvent[];
}

export const EventList: React.FC<EventListProps> = ({ selectedDay, events }) => {
  // Filter events for the selected day
  const selectedDayEvents = selectedDay 
    ? events.filter(event => 
        event.date.getDate() === selectedDay.getDate() &&
        event.date.getMonth() === selectedDay.getMonth() &&
        event.date.getFullYear() === selectedDay.getFullYear()
      )
    : [];
  
  return (
    <div className="md:border-l md:pl-6 h-full">
      <div className="mb-4">
        <h3 className="text-lg font-medium">
          Events for {selectedDay ? format(selectedDay, 'MMMM d, yyyy') : 'No date selected'}
        </h3>
      </div>
      
      {selectedDayEvents.length > 0 ? (
        <div className="space-y-4">
          {selectedDayEvents.map((event) => (
            <Card key={event.id} className="hover:shadow-md transition-shadow">
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
  );
};
