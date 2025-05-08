
import React, { useState } from 'react';
import { AdminAuthProvider, LoginForm, useAdminAuth } from "@/components/AdminAuth";
import { ContentManager } from "@/components/ContentManager";
import { Gallery } from "@/components/Gallery";
import { UserManager } from "@/components/UserManager";
import { PageManager } from "@/components/PageManager";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Edit, GalleryHorizontal, LogOut, Users, FileText } from "lucide-react";

const AdminContent = () => {
  const { isAuthenticated, logout } = useAdminAuth();
  const [activeTab, setActiveTab] = useState("content");

  if (!isAuthenticated) {
    return <LoginForm onLogin={() => {}} />;
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <Button variant="ghost" onClick={logout} className="flex items-center gap-2">
            <LogOut className="w-4 h-4" /> Logout
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="content" className="flex items-center gap-2">
              <Edit className="w-4 h-4" /> News
            </TabsTrigger>
            <TabsTrigger value="pages" className="flex items-center gap-2">
              <FileText className="w-4 h-4" /> Pages
            </TabsTrigger>
            <TabsTrigger value="gallery" className="flex items-center gap-2">
              <GalleryHorizontal className="w-4 h-4" /> Gallery
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="w-4 h-4" /> Users
            </TabsTrigger>
          </TabsList>
          <TabsContent value="content" className="bg-white rounded-lg shadow-sm p-6">
            <ContentManager />
          </TabsContent>
          <TabsContent value="pages" className="bg-white rounded-lg shadow-sm p-6">
            <PageManager />
          </TabsContent>
          <TabsContent value="gallery" className="bg-white rounded-lg shadow-sm p-6">
            <Gallery isAdmin={true} />
          </TabsContent>
          <TabsContent value="users" className="bg-white rounded-lg shadow-sm p-6">
            <UserManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

const Admin = () => {
  return (
    <AdminAuthProvider>
      <AdminContent />
    </AdminAuthProvider>
  );
};

export default Admin;
