
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays } from "lucide-react";

interface NewsCardProps {
  title: string;
  date: string;
  description: string;
  link?: string;
}

const NewsCard: React.FC<NewsCardProps> = ({ title, date, description, link }) => {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-spectrum-800">{title}</CardTitle>
        <CardDescription className="flex items-center mt-1">
          <CalendarDays className="h-4 w-4 mr-1" />
          <span>{date}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p>{description}</p>
      </CardContent>
      {link && (
        <CardFooter>
          <Button variant="outline" size="sm" className="text-spectrum-600 hover:text-spectrum-800">
            Read More
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default NewsCard;
