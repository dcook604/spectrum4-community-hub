
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { GalleryHorizontal, Download } from "lucide-react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Recycling', path: '/recycling' },
    { name: 'Bylaws', path: '/bylaws' },
    { name: 'Contacts', path: '/contacts' },
    { name: 'Calendar', path: '/calendar' },
    { name: 'Move In/Out', path: '/move-in-out' },
    { name: 'Documents', path: '/documents', icon: Download },
    { name: 'Gallery', path: '/gallery', icon: GalleryHorizontal },
  ];

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img 
                src="/lovable-uploads/dee11acd-11f1-4587-a514-c315a952b4e8.png" 
                alt="Spectrum 4 Logo" 
                className="h-10 mr-3" 
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className="text-gray-700 hover:text-spectrum-blue px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
              >
                {link.icon && <link.icon className="mr-1 h-4 w-4" />}
                {link.name}
              </Link>
            ))}
            <Link 
              to="/admin" 
              className="text-gray-700 hover:text-spectrum-blue px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Admin
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-500 hover:text-gray-700"
            >
              <span className="sr-only">Open menu</span>
              {isMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "md:hidden absolute z-50 w-full bg-white shadow-md transition-all duration-300 ease-in-out",
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 invisible"
        )}
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-spectrum-blue hover:bg-gray-50 flex items-center"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.icon && <link.icon className="mr-2 h-4 w-4" />}
              {link.name}
            </Link>
          ))}
          <Link
            to="/admin"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-spectrum-blue hover:bg-gray-50"
            onClick={() => setIsMenuOpen(false)}
          >
            Admin
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
