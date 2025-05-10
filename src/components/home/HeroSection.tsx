
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

export const HeroSection: React.FC = () => {
  return (
    <section className="bg-gradient-to-b from-white to-blue-50 text-spectrum-800">
      <div className="container mx-auto px-4 py-16 sm:py-24">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <img 
              src="/lovable-uploads/dee11acd-11f1-4587-a514-c315a952b4e8.png" 
              alt="Spectrum 4 Logo" 
              className="h-28 md:h-36"
            />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-spectrum-800">Welcome to Spectrum 4</h1>
          <p className="text-xl sm:text-2xl mb-8 max-w-3xl mx-auto text-gray-700">
            Your community hub for strata information, updates, and resources.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-spectrum-800 hover:bg-spectrum-700 text-white">
              <Link to="/calendar">View Calendar</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-spectrum-800 text-spectrum-800 hover:bg-spectrum-50">
              <Link to="/gallery">Visit Gallery</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
