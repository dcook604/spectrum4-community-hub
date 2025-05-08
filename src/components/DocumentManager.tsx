
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { FilePlus, Trash, Download, FileText } from "lucide-react";

interface Document {
  id: string;
  title: string;
  description: string;
  fileName: string;
  fileContent: string; // Base64 encoded file
  fileType: string;
  fileSize: number;
  uploadDate: string;
}

export function DocumentManager() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [newDocument, setNewDocument] = useState<Partial<Document>>({
    title: '',
    description: '',
  });
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();

  // Load documents from localStorage
  useEffect(() => {
    const savedDocuments = localStorage.getItem('siteDocuments');
    if (savedDocuments) {
      setDocuments(JSON.parse(savedDocuments));
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      
      // Update document info based on the file
      setNewDocument(prev => ({
        ...prev,
        fileName: selectedFile.name,
        fileType: selectedFile.type,
        fileSize: selectedFile.size,
      }));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewDocument(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      toast({
        title: "Error",
        description: "Please select a file to upload.",
        variant: "destructive"
      });
      return;
    }

    try {
      // Convert file to base64
      const base64Content = await convertFileToBase64(file);
      
      const newDoc: Document = {
        id: Date.now().toString(),
        title: newDocument.title || file.name,
        description: newDocument.description || '',
        fileName: file.name,
        fileContent: base64Content,
        fileType: file.type,
        fileSize: file.size,
        uploadDate: new Date().toISOString()
      };

      const updatedDocuments = [...documents, newDoc];
      setDocuments(updatedDocuments);
      localStorage.setItem('siteDocuments', JSON.stringify(updatedDocuments));
      
      // Reset form
      setNewDocument({
        title: '',
        description: '',
      });
      setFile(null);
      setShowUploadForm(false);
      
      toast({
        title: "Document Uploaded",
        description: `${newDoc.title} has been uploaded successfully.`
      });
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "There was an error uploading the document.",
        variant: "destructive"
      });
    }
  };

  const handleDelete = (id: string) => {
    const docToDelete = documents.find(doc => doc.id === id);
    if (!docToDelete) return;
    
    const updatedDocuments = documents.filter(doc => doc.id !== id);
    setDocuments(updatedDocuments);
    localStorage.setItem('siteDocuments', JSON.stringify(updatedDocuments));
    
    toast({
      title: "Document Deleted",
      description: `${docToDelete.title} has been deleted.`
    });
  };

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          reject(new Error('Failed to convert file to base64'));
        }
      };
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' bytes';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(2) + ' KB';
    else return (bytes / 1048576).toFixed(2) + ' MB';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <FileText className="w-6 h-6 mr-3 text-spectrum-700" />
          <h2 className="text-2xl font-bold">Manage Documents</h2>
        </div>
        <Button 
          onClick={() => setShowUploadForm(true)}
          className="flex items-center gap-2"
          disabled={showUploadForm}
        >
          <FilePlus className="w-4 h-4" /> Upload Document
        </Button>
      </div>

      {showUploadForm ? (
        <Card>
          <CardHeader>
            <CardTitle>Upload New Document</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="file">Select File</Label>
                <Input 
                  id="file" 
                  type="file" 
                  onChange={handleFileChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="title">Document Title</Label>
                <Input 
                  id="title" 
                  name="title"
                  value={newDocument.title}
                  onChange={handleInputChange}
                  placeholder={file?.name || "Document Title"}
                />
                <p className="text-xs text-gray-500">Leave blank to use filename</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description (optional)</Label>
                <Input 
                  id="description" 
                  name="description"
                  value={newDocument.description}
                  onChange={handleInputChange}
                  placeholder="Brief description of the document"
                />
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowUploadForm(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Upload Document</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-6">
            {documents.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Document</TableHead>
                    <TableHead>File Info</TableHead>
                    <TableHead>Upload Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {documents.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell>
                        <div className="font-medium">{doc.title}</div>
                        <div className="text-sm text-gray-500">{doc.description}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {doc.fileName} ({formatFileSize(doc.fileSize)})
                        </div>
                      </TableCell>
                      <TableCell>{formatDate(doc.uploadDate)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-8 w-8 p-0"
                            title="Download Document"
                            onClick={() => {
                              // Create download link
                              const link = document.createElement('a');
                              link.href = doc.fileContent;
                              link.download = doc.fileName;
                              document.body.appendChild(link);
                              link.click();
                              document.body.removeChild(link);
                            }}
                          >
                            <Download className="h-4 w-4" />
                            <span className="sr-only">Download</span>
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleDelete(doc.id)}
                            className="h-8 w-8 p-0 text-red-500 hover:text-red-600"
                            title="Delete Document"
                          >
                            <Trash className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No documents uploaded yet. Click "Upload Document" to add one.
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
