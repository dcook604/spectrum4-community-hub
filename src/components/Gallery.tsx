
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ImageIcon, Upload, Folder } from "lucide-react";

interface GalleryImage {
  id: string;
  src: string;
  title: string;
  description: string;
  date: string;
}

export const Gallery: React.FC<{ isAdmin?: boolean }> = ({ isAdmin = false }) => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [newImage, setNewImage] = useState<{
    title: string;
    description: string;
    file: File | null;
    previewUrl: string;
  }>({
    title: '',
    description: '',
    file: null,
    previewUrl: '',
  });
  const { toast } = useToast();

  // Load saved images from localStorage
  useEffect(() => {
    const savedImages = localStorage.getItem('galleryImages');
    if (savedImages) {
      setImages(JSON.parse(savedImages));
    }
  }, []);

  const handleImageClick = (image: GalleryImage) => {
    setSelectedImage(image);
  };

  const handleCloseDialog = () => {
    setSelectedImage(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (event) => {
        if (event.target && typeof event.target.result === 'string') {
          setNewImage({
            ...newImage,
            file,
            previewUrl: event.target.result
          });
        }
      };
      
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImage.file || !newImage.title) {
      toast({
        title: "Missing Information",
        description: "Please provide an image and title.",
        variant: "destructive",
      });
      return;
    }

    const newGalleryImage: GalleryImage = {
      id: Date.now().toString(),
      src: newImage.previewUrl,
      title: newImage.title,
      description: newImage.description,
      date: new Date().toISOString().split('T')[0]
    };

    const updatedImages = [...images, newGalleryImage];
    setImages(updatedImages);
    localStorage.setItem('galleryImages', JSON.stringify(updatedImages));
    
    setNewImage({
      title: '',
      description: '',
      file: null,
      previewUrl: '',
    });
    
    setIsUploading(false);
    toast({
      title: "Image Uploaded",
      description: "Your image has been added to the gallery.",
    });
  };

  const handleDelete = (id: string) => {
    const updatedImages = images.filter(img => img.id !== id);
    setImages(updatedImages);
    localStorage.setItem('galleryImages', JSON.stringify(updatedImages));
    setSelectedImage(null);
    
    toast({
      title: "Image Deleted",
      description: "The image has been removed from the gallery.",
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <ImageIcon className="w-8 h-8 mr-3 text-spectrum-700" />
          <h2 className="text-2xl font-bold">Community Gallery</h2>
        </div>
        {isAdmin && (
          <Button 
            onClick={() => setIsUploading(true)}
            className="flex items-center gap-2"
          >
            <Upload className="w-4 h-4" /> Add Image
          </Button>
        )}
      </div>

      {isAdmin && isUploading && (
        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleUpload} className="space-y-4">
              <h3 className="text-lg font-semibold mb-4">Upload New Image</h3>
              
              <div className="space-y-2">
                <Label htmlFor="image">Select Image</Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  required
                />
              </div>
              
              {newImage.previewUrl && (
                <div className="mt-4">
                  <img 
                    src={newImage.previewUrl} 
                    alt="Preview" 
                    className="w-full max-h-64 object-contain rounded-md" 
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newImage.title}
                  onChange={(e) => setNewImage({...newImage, title: e.target.value})}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newImage.description}
                  onChange={(e) => setNewImage({...newImage, description: e.target.value})}
                />
              </div>
              
              <div className="flex justify-end space-x-2 pt-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsUploading(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Upload</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {images.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image) => (
            <div 
              key={image.id} 
              className="cursor-pointer rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              onClick={() => handleImageClick(image)}
            >
              <div className="aspect-square overflow-hidden bg-gray-100">
                <img 
                  src={image.src} 
                  alt={image.title} 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="p-2">
                <h3 className="text-sm font-medium truncate">{image.title}</h3>
                <p className="text-xs text-gray-500">{image.date}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Folder className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">No images</h3>
          <p className="mt-1 text-sm text-gray-500">
            {isAdmin ? "Get started by uploading an image." : "Check back later for community photos."}
          </p>
        </div>
      )}

      {/* Image detail dialog */}
      <Dialog open={!!selectedImage} onOpenChange={() => handleCloseDialog()}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>{selectedImage?.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="rounded-md overflow-hidden">
              <img 
                src={selectedImage?.src} 
                alt={selectedImage?.title} 
                className="w-full object-contain max-h-[60vh]" 
              />
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">{selectedImage?.date}</p>
              <p>{selectedImage?.description}</p>
            </div>
            {isAdmin && (
              <div className="flex justify-end pt-2">
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => selectedImage && handleDelete(selectedImage.id)}
                >
                  Delete Image
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
