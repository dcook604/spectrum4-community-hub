
import React, { useEffect, useState } from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { NewsSection } from '@/components/home/NewsSection';
import { QuickLinksSection } from '@/components/home/QuickLinksSection';
import { MoveInOutCTA } from '@/components/home/MoveInOutCTA';

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

  return (
    <div className="min-h-screen">
      <HeroSection />
      <NewsSection newsItems={newsItems} />
      <QuickLinksSection pages={pages} />
      <MoveInOutCTA />
    </div>
  );
};

export default Index;
