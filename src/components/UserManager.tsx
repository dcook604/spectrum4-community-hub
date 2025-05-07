
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash, UserPlus } from "lucide-react";
import { AdminCredentials, getAdminUsers, addAdminUser, removeAdminUser } from './AdminAuth';

export function UserManager() {
  const [users, setUsers] = useState<AdminCredentials[]>(getAdminUsers());
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const { toast } = useToast();

  const handleAddUser = () => {
    // Validate inputs
    if (!newUsername || !newPassword) {
      toast({
        title: "Error",
        description: "Please enter both username and password.",
        variant: "destructive",
      });
      return;
    }

    // Check if user already exists
    if (users.some(user => user.username === newUsername)) {
      toast({
        title: "Error",
        description: "A user with this username already exists.",
        variant: "destructive",
      });
      return;
    }

    // Add user
    const updatedUsers = addAdminUser(newUsername, newPassword);
    setUsers(updatedUsers);
    setNewUsername('');
    setNewPassword('');
    
    toast({
      title: "Success",
      description: "Admin user added successfully.",
    });
  };

  const handleRemoveUser = (username: string) => {
    // Don't allow removing all users
    if (users.length === 1) {
      toast({
        title: "Error",
        description: "Cannot remove the last admin user.",
        variant: "destructive",
      });
      return;
    }

    // Remove user
    const updatedUsers = removeAdminUser(username);
    setUsers(updatedUsers);
    
    toast({
      title: "Success",
      description: "Admin user removed successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Add New Admin User</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input 
                id="username" 
                placeholder="Enter username or email"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="Enter password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleAddUser} className="gap-2">
            <UserPlus className="w-4 h-4" /> Add User
          </Button>
        </CardFooter>
      </Card>

      <div>
        <h2 className="text-lg font-medium mb-4">Current Admin Users</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Username</TableHead>
              <TableHead className="w-24 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.username}>
                <TableCell>{user.username}</TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleRemoveUser(user.username)}
                    className="h-8 w-8 p-0"
                  >
                    <Trash className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
