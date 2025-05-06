
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface ContentItem {
  id: string;
  title: string;
  content: string;
  type: string;
  date?: string;
}

export const ContentManager: React.FC = () => {
  const [newsItems, setNewsItems] = useState<ContentItem[]>([]);
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null);
  const { toast } = useToast();

  // Load saved news items from localStorage
  useEffect(() => {
    const savedItems = localStorage.getItem('newsItems');
    if (savedItems) {
      setNewsItems(JSON.parse(savedItems));
    } else {
      // Default news items
      const defaultItems = [
        {
          id: '1',
          title: "Annual General Meeting",
          content: "Join us for the Annual General Meeting where we'll discuss the budget for the coming year and elect new strata council members.",
          type: "news",
          date: "May 15, 2025"
        },
        {
          id: '2',
          title: "Maintenance Notice",
          content: "The elevator will be undergoing routine maintenance on May 10th from 10am to 2pm. Please plan accordingly.",
          type: "news",
          date: "May 10, 2025"
        },
        {
          id: '3',
          title: "New Recycling Guidelines",
          content: "New recycling guidelines have been issued by the city. Please review the updated information on our recycling page.",
          type: "news",
          date: "April 30, 2025"
        }
      ];
      setNewsItems(defaultItems);
      localStorage.setItem('newsItems', JSON.stringify(defaultItems));
    }
  }, []);

  const saveItems = (items: ContentItem[]) => {
    localStorage.setItem('newsItems', JSON.stringify(items));
    setNewsItems(items);
  };

  const handleAddItem = () => {
    setEditingItem({
      id: Date.now().toString(),
      title: '',
      content: '',
      type: 'news',
      date: new Date().toISOString().split('T')[0]
    });
  };

  const handleEditItem = (item: ContentItem) => {
    setEditingItem({ ...item });
  };

  const handleDeleteItem = (id: string) => {
    const updatedItems = newsItems.filter(item => item.id !== id);
    saveItems(updatedItems);
    toast({
      title: "Item Deleted",
      description: "The content item has been deleted.",
    });
  };

  const handleSaveItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      const updatedItems = editingItem.id 
        ? newsItems.map(item => item.id === editingItem.id ? editingItem : item)
        : [...newsItems, editingItem];
      
      saveItems(updatedItems);
      setEditingItem(null);
      
      toast({
        title: "Content Saved",
        description: "Your changes have been saved successfully.",
      });
    }
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage News & Announcements</h2>
        <Button onClick={handleAddItem}>Add New Item</Button>
      </div>

      {editingItem ? (
        <Card>
          <CardHeader>
            <CardTitle>{editingItem.id ? 'Edit' : 'Add'} Content Item</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSaveItem} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input 
                  id="title" 
                  value={editingItem.title} 
                  onChange={(e) => setEditingItem({...editingItem, title: e.target.value})}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input 
                  id="date" 
                  type="date" 
                  value={editingItem.date} 
                  onChange={(e) => setEditingItem({...editingItem, date: e.target.value})}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea 
                  id="content" 
                  value={editingItem.content} 
                  onChange={(e) => setEditingItem({...editingItem, content: e.target.value})}
                  className="min-h-[150px]"
                  required
                />
              </div>
              
              <div className="flex justify-end space-x-2 mt-4">
                <Button variant="outline" type="button" onClick={handleCancelEdit}>Cancel</Button>
                <Button type="submit">Save</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {newsItems.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                    <p className="text-sm text-gray-500 mb-2">{item.date}</p>
                    <p className="text-gray-700">{item.content}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => handleEditItem(item)}>Edit</Button>
                    <Button variant="ghost" size="sm" className="text-red-500" onClick={() => handleDeleteItem(item.id)}>Delete</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
