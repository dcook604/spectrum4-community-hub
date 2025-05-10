
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

export const MoveInOutCTA: React.FC = () => {
  return (
    <section className="section-padding bg-spectrum-blue/10">
      <div className="container mx-auto">
        <div className="bg-white rounded-xl shadow-sm p-8 flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0 md:mr-8">
            <h2 className="text-2xl font-bold mb-2">Planning a Move?</h2>
            <p className="text-gray-600 max-w-xl">
              All moves in or out of the building must be scheduled in advance. Please review our guidelines 
              and submit your request at least one week prior to your move date.
            </p>
          </div>
          <Button asChild size="lg" className="bg-spectrum-800 hover:bg-spectrum-700 whitespace-nowrap text-white">
            <Link to="/move-in-out">Schedule a Move</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
