
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import NewsCard from "@/components/NewsCard";
import { CalendarDays, FileText, Recycle, Users } from "lucide-react";
import { Link } from 'react-router-dom';

interface NewsItem {
  id: string;
  title: string;
  date: string;
  content: string;
  type: string;
}

interface PageContent {
  id: string;
  slug: string;
  title: string;
  content: string;
  lastUpdated: string;
}

const Index = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [pages, setPages] = useState<PageContent[]>([]);

  useEffect(() => {
    // Load news items from localStorage
    const storedItems = localStorage.getItem('newsItems');
    if (storedItems) {
      const items = JSON.parse(storedItems);
      setNewsItems(items.slice(0, 3)); // Show only first 3 items
    } else {
      // Default news items if none found in localStorage
      const defaultItems = [
        {
          id: '1',
          title: "Annual General Meeting",
          date: "May 15, 2025",
          content: "Join us for the Annual General Meeting where we'll discuss the budget for the coming year and elect new strata council members.",
          type: "news"
        },
        {
          id: '2',
          title: "Maintenance Notice",
          date: "May 10, 2025",
          content: "The elevator will be undergoing routine maintenance on May 10th from 10am to 2pm. Please plan accordingly.",
          type: "news"
        },
        {
          id: '3',
          title: "New Recycling Guidelines",
          date: "April 30, 2025",
          content: "New recycling guidelines have been issued by the city. Please review the updated information on our recycling page.",
          type: "news"
        }
      ];
      setNewsItems(defaultItems);
    }

    // Load pages
    const storedPages = localStorage.getItem('sitePages');
    if (storedPages) {
      setPages(JSON.parse(storedPages));
    }
  }, []);

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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-spectrum-blue text-white">
        <div className="container mx-auto px-4 py-16 sm:py-24">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <img 
                src="/lovable-uploads/dee11acd-11f1-4587-a514-c315a952b4e8.png" 
                alt="Spectrum 4 Logo" 
                className="h-28 md:h-36"
              />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">Welcome to Spectrum 4</h1>
            <p className="text-xl sm:text-2xl mb-8 max-w-3xl mx-auto">
              Your community hub for strata information, updates, and resources.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-white text-spectrum-blue hover:bg-gray-100">
                <Link to="/calendar">View Calendar</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-white border-white hover:bg-spectrum-blue/80">
                <Link to="/gallery">Visit Gallery</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Latest News</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsItems.map(item => (
              <NewsCard 
                key={item.id}
                title={item.title}
                date={item.date}
                description={item.content}
                link="#"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Quick Links</h2>
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

      {/* Move In/Out CTA */}
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
            <Button asChild size="lg" className="bg-spectrum-blue hover:bg-spectrum-blue/90 whitespace-nowrap">
              <Link to="/move-in-out">Schedule a Move</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
