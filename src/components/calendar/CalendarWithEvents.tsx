
import React from 'react';
import { Calendar as CalendarUI } from "@/components/ui/calendar";
import { format } from "date-fns";

interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  date: Date;
  createdAt: Date;
}

interface CalendarWithEventsProps {
  selectedDay: Date | undefined;
  setSelectedDay: (date: Date | undefined) => void;
  events: CalendarEvent[];
}

export const CalendarWithEvents: React.FC<CalendarWithEventsProps> = ({ 
  selectedDay, 
  setSelectedDay,
  events 
}) => {
  // Function to get events for a specific day
  const getDayEvents = (day: Date) => {
    return events.filter(event => 
      event.date.getDate() === day.getDate() &&
      event.date.getMonth() === day.getMonth() &&
      event.date.getFullYear() === day.getFullYear()
    );
  };

  return (
    <CalendarUI
      mode="single"
      selected={selectedDay}
      onSelect={setSelectedDay}
      className="p-3 pointer-events-auto rounded-md border shadow-sm"
      modifiersClassNames={{
        selected: "bg-spectrum-800 text-white hover:bg-spectrum-900",
      }}
      modifiers={{
        dayWithEvent: (date) => getDayEvents(date).length > 0,
      }}
      classNames={{
        day_selected: "bg-spectrum-800 text-white hover:bg-spectrum-900",
        day: "relative",
      }}
      components={{
        DayContent: (props) => {
          // Check if this day has events
          const hasEvent = getDayEvents(props.date).length > 0;
          
          return (
            <div className="relative w-full h-full flex items-center justify-center">
              <div>{props.date.getDate()}</div>
              {hasEvent && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-spectrum-800 rounded-full"></div>
              )}
            </div>
          );
        },
      }}
    />
  );
};
