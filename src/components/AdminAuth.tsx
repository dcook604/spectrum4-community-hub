
import React, { useState, createContext, useContext, ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface AdminAuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};

interface AdminAuthProviderProps {
  children: ReactNode;
}

// Define valid admin credentials
export interface AdminCredentials {
  username: string;
  password: string;
}

// Storage key for admin users in localStorage
const ADMIN_USERS_KEY = 'adminUsers';

// Initial admin users
const defaultAdmins: AdminCredentials[] = [
  { username: 'admin', password: 'spectrum4' },
  { username: 'dcook@spectrum4.ca', password: 'admin123' }
];

// Function to get admin users from localStorage or use defaults
export const getAdminUsers = (): AdminCredentials[] => {
  const storedUsers = localStorage.getItem(ADMIN_USERS_KEY);
  if (storedUsers) {
    return JSON.parse(storedUsers);
  }
  // Initialize localStorage with default users if it doesn't exist
  localStorage.setItem(ADMIN_USERS_KEY, JSON.stringify(defaultAdmins));
  return defaultAdmins;
};

// Function to add a new admin user
export const addAdminUser = (username: string, password: string): AdminCredentials[] => {
  const users = getAdminUsers();
  const updatedUsers = [...users, { username, password }];
  localStorage.setItem(ADMIN_USERS_KEY, JSON.stringify(updatedUsers));
  return updatedUsers;
};

// Function to remove an admin user
export const removeAdminUser = (username: string): AdminCredentials[] => {
  const users = getAdminUsers();
  const updatedUsers = users.filter(user => user.username !== username);
  localStorage.setItem(ADMIN_USERS_KEY, JSON.stringify(updatedUsers));
  return updatedUsers;
};

export const AdminAuthProvider: React.FC<AdminAuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const stored = localStorage.getItem('adminAuthenticated');
    return stored === 'true';
  });
  const { toast } = useToast();

  const login = (username: string, password: string) => {
    // Get current users from localStorage
    const validAdmins = getAdminUsers();
    
    // Check if credentials match any valid admin
    const isValid = validAdmins.some(
      admin => admin.username === username && admin.password === password
    );

    if (isValid) {
      setIsAuthenticated(true);
      localStorage.setItem('adminAuthenticated', 'true');
      toast({
        title: "Logged in successfully",
        description: "Welcome to the admin dashboard.",
      });
      return true;
    } else {
      toast({
        title: "Authentication failed",
        description: "Invalid username or password.",
        variant: "destructive",
      });
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuthenticated');
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
  };

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

interface LoginFormProps {
  onLogin: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAdminAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(username, password);
    if (success) {
      onLogin();
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Admin Login</CardTitle>
          <CardDescription>Login to manage Spectrum 4 strata content</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input 
                id="username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">Login</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

