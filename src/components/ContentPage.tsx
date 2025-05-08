
import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Card, CardContent } from "@/components/ui/card";

interface PageContent {
  id: string;
  slug: string;
  title: string;
  content: string;
  lastUpdated: string;
}

export default function ContentPage() {
  const { slug } = useParams<{ slug: string }>();
  const [page, setPage] = useState<PageContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const loadPage = () => {
      setLoading(true);
      const savedPages = localStorage.getItem('sitePages');
      
      if (savedPages) {
        const pages = JSON.parse(savedPages) as PageContent[];
        const foundPage = pages.find(p => p.slug === slug);
        
        if (foundPage) {
          setPage(foundPage);
          setNotFound(false);
        } else {
          setPage(null);
          setNotFound(true);
        }
      } else {
        setNotFound(true);
      }
      
      setLoading(false);
    };

    loadPage();
  }, [slug]);

  if (loading) {
    return (
      <div className="container mx-auto p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-10 bg-gray-200 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  if (notFound) {
    return <Navigate to="/not-found" />;
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <Card>
        <CardContent className="p-6 md:p-8">
          {page && (
            <div className="prose max-w-none">
              <ReactMarkdown>{page.content}</ReactMarkdown>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
