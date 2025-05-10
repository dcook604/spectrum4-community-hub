
import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, FileText, Recycle, Users } from "lucide-react";

interface PageContent {
  id: string;
  slug: string;
  title: string;
  content: string;
  lastUpdated: string;
}

interface QuickLinksSectionProps {
  pages: PageContent[];
}

export const QuickLinksSection: React.FC<QuickLinksSectionProps> = ({ pages }) => {
  // Create dynamic quick links from pages
  const quickLinks = [
    {
      title: "Recycling Guide",
      description: "Learn about proper waste sorting and collection schedules",
      icon: Recycle,
      link: "/recycling",
      color: "bg-spectrum-green/20 text-spectrum-green"
    },
    {
      title: "Strata Bylaws",
      description: "Review our community rules and regulations",
      icon: FileText,
      link: "/bylaws",
      color: "bg-spectrum-blue/20 text-spectrum-blue"
    },
    {
      title: "Important Contacts",
      description: "Find contact information for strata council and services",
      icon: Users,
      link: "/contacts",
      color: "bg-spectrum-red/20 text-spectrum-red"
    },
    {
      title: "Upcoming Events",
      description: "View the calendar for meetings and community events",
      icon: CalendarDays,
      link: "/calendar",
      color: "bg-spectrum-yellow/20 text-spectrum-yellow"
    }
  ].map(link => {
    // Match link with actual page if exists
    const matchingPage = pages.find(page => page.slug === link.link.substring(1));
    return matchingPage ? link : link;
  });

  return (
    <section className="section-padding bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center text-spectrum-800">Quick Links</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickLinks.map((link, index) => (
            <Link 
              key={index} 
              to={link.link}
              className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow hover-scale"
            >
              <div className={`w-12 h-12 rounded-full ${link.color} flex items-center justify-center mb-4`}>
                <link.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{link.title}</h3>
              <p className="text-gray-600">{link.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
