
import React from 'react';
import NewsCard from "@/components/NewsCard";

interface NewsItem {
  id: string;
  title: string;
  date: string;
  content: string;
  type: string;
}

interface NewsSectionProps {
  newsItems: NewsItem[];
}

export const NewsSection: React.FC<NewsSectionProps> = ({ newsItems }) => {
  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center text-spectrum-800">Latest News</h2>
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
  );
};
