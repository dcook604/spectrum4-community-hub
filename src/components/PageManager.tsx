
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { FileText, FilePlus, Trash, PenLine } from "lucide-react";

interface PageContent {
  id: string;
  slug: string;
  title: string;
  content: string;
  lastUpdated: string;
}

export function PageManager() {
  const [pages, setPages] = useState<PageContent[]>([]);
  const [editingPage, setEditingPage] = useState<PageContent | null>(null);
  const [showEditor, setShowEditor] = useState(false);
  const { toast } = useToast();

  // Load saved pages from localStorage
  useEffect(() => {
    const savedPages = localStorage.getItem('sitePages');
    if (savedPages) {
      setPages(JSON.parse(savedPages));
    } else {
      // Default pages
      const defaultPages = [
        {
          id: '1',
          slug: 'recycling',
          title: "Recycling Guide",
          content: "# Recycling Guide\n\nOur building follows the city's recycling guidelines. Please sort your waste into the following categories:\n\n- Paper and Cardboard\n- Plastics (Types 1, 2, and 5)\n- Glass\n- Metal\n- Compost\n\nCollection days are Tuesday and Friday.",
          lastUpdated: new Date().toISOString()
        },
        {
          id: '2',
          slug: 'bylaws',
          title: "Strata Bylaws",
          content: "# Strata Bylaws\n\n## Noise\nQuiet hours are from 10pm to 8am.\n\n## Pets\nPets are allowed but must be registered with the strata council.\n\n## Rentals\nShort-term rentals less than 30 days are not permitted.",
          lastUpdated: new Date().toISOString()
        },
        {
          id: '3',
          slug: 'contacts',
          title: "Important Contacts",
          content: "# Important Contacts\n\n## Strata Manager\nJohn Smith - john@example.com - 555-123-4567\n\n## Building Manager\nSarah Johnson - sarah@example.com - 555-234-5678\n\n## Emergency Contact\nMaintenance Hotline - 555-911-0000",
          lastUpdated: new Date().toISOString()
        },
        {
          id: '4',
          slug: 'calendar',
          title: "Upcoming Events",
          content: "# Upcoming Events\n\n## Annual General Meeting\nMay 15, 2025 - 7:00 PM - Meeting Room A\n\n## Building Maintenance\nElevator service - May 10, 2025 - 10:00 AM to 2:00 PM\n\n## Community BBQ\nJune 20, 2025 - 12:00 PM - Rooftop Garden",
          lastUpdated: new Date().toISOString()
        }
      ];
      setPages(defaultPages);
      localStorage.setItem('sitePages', JSON.stringify(defaultPages));
    }
  }, []);

  const savePage = (page: PageContent) => {
    const updatedPages = editingPage?.id
      ? pages.map(p => p.id === editingPage.id ? {...page, lastUpdated: new Date().toISOString()} : p)
      : [...pages, {...page, id: Date.now().toString(), lastUpdated: new Date().toISOString()}];
    
    localStorage.setItem('sitePages', JSON.stringify(updatedPages));
    setPages(updatedPages);
    setEditingPage(null);
    setShowEditor(false);
    
    toast({
      title: editingPage?.id ? "Page Updated" : "Page Created",
      description: `The page "${page.title}" has been ${editingPage?.id ? 'updated' : 'created'} successfully.`,
    });
  };

  const handleDeletePage = (id: string) => {
    const pageToDelete = pages.find(page => page.id === id);
    if (!pageToDelete) return;

    const updatedPages = pages.filter(page => page.id !== id);
    localStorage.setItem('sitePages', JSON.stringify(updatedPages));
    setPages(updatedPages);
    
    toast({
      title: "Page Deleted",
      description: `The page "${pageToDelete.title}" has been deleted.`,
    });
  };

  const handleAddPage = () => {
    setEditingPage({
      id: '',
      slug: '',
      title: '',
      content: '',
      lastUpdated: ''
    });
    setShowEditor(true);
  };

  const handleEditPage = (page: PageContent) => {
    setEditingPage({...page});
    setShowEditor(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPage) return;
    savePage(editingPage);
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
          <h2 className="text-2xl font-bold">Manage Pages</h2>
        </div>
        <Button 
          onClick={handleAddPage}
          className="flex items-center gap-2"
        >
          <FilePlus className="w-4 h-4" /> Add New Page
        </Button>
      </div>

      {showEditor ? (
        <Card>
          <CardHeader>
            <CardTitle>{editingPage?.id ? 'Edit' : 'Create New'} Page</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="title">Page Title</Label>
                  <Input 
                    id="title" 
                    value={editingPage?.title || ''} 
                    onChange={(e) => setEditingPage(prev => prev ? {...prev, title: e.target.value} : null)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">Page URL Slug</Label>
                  <Input 
                    id="slug" 
                    value={editingPage?.slug || ''} 
                    onChange={(e) => setEditingPage(prev => prev ? 
                      {...prev, slug: e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')} : null
                    )}
                    placeholder="page-url-slug"
                    required
                  />
                  <p className="text-xs text-gray-500">This will be used in the page URL. Only lowercase letters, numbers, and hyphens.</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="content">Page Content</Label>
                <p className="text-xs text-gray-500 mb-2">You can use Markdown formatting for headings, lists, and more.</p>
                <Textarea 
                  id="content" 
                  value={editingPage?.content || ''} 
                  onChange={(e) => setEditingPage(prev => prev ? {...prev, content: e.target.value} : null)}
                  className="min-h-[300px] font-mono"
                  required
                />
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    setEditingPage(null);
                    setShowEditor(false);
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">Save Page</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Page Title</TableHead>
                  <TableHead>URL Slug</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pages.map((page) => (
                  <TableRow key={page.id}>
                    <TableCell className="font-medium">{page.title}</TableCell>
                    <TableCell>/{page.slug}</TableCell>
                    <TableCell>{formatDate(page.lastUpdated)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleEditPage(page)}
                          className="h-8 w-8 p-0"
                          title="Edit Page"
                        >
                          <PenLine className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleDeletePage(page.id)}
                          className="h-8 w-8 p-0 text-red-500 hover:text-red-600"
                          title="Delete Page"
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
          </CardContent>
        </Card>
      )}
    </div>
  );
}
