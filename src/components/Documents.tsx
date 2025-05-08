
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";

// Renamed interface from Document to DocumentFile to avoid conflict with DOM Document type
interface DocumentFile {
  id: string;
  title: string;
  description: string;
  fileName: string;
  fileContent: string;
  fileType: string;
  fileSize: number;
  uploadDate: string;
}

export default function Documents() {
  const [documents, setDocuments] = useState<DocumentFile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDocuments = () => {
      setLoading(true);
      const savedDocuments = localStorage.getItem('siteDocuments');
      
      if (savedDocuments) {
        setDocuments(JSON.parse(savedDocuments));
      }
      
      setLoading(false);
    };

    loadDocuments();
  }, []);

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' bytes';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(2) + ' KB';
    else return (bytes / 1048576).toFixed(2) + ' MB';
  };

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

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="flex items-center mb-6">
        <FileText className="w-6 h-6 mr-2 text-spectrum-700" />
        <h1 className="text-2xl md:text-3xl font-bold">Documents</h1>
      </div>
      
      {documents.length > 0 ? (
        <div className="grid gap-4 md:gap-6">
          {documents.map((doc) => (
            <Card key={doc.id} className="overflow-hidden">
              <CardContent className="p-4 md:p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{doc.title}</h3>
                    {doc.description && (
                      <p className="text-gray-600 mt-1">{doc.description}</p>
                    )}
                    <p className="text-sm text-gray-500 mt-2">
                      {doc.fileName} ({formatFileSize(doc.fileSize)})
                    </p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center gap-1"
                    onClick={() => {
                      // Using the global document object, not the document variable from the map function
                      const link = window.document.createElement('a');
                      link.href = doc.fileContent;
                      link.download = doc.fileName;
                      window.document.body.appendChild(link);
                      link.click();
                      window.document.body.removeChild(link);
                    }}
                  >
                    <Download className="h-4 w-4" />
                    <span>Download</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <FileText className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">No documents available</h3>
          <p className="mt-2 text-sm text-gray-500">Check back later for updates.</p>
        </div>
      )}
    </div>
  );
}
