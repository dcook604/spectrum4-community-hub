
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { GalleryHorizontal, Download, ChevronDown, Mail, Calendar, FileText, Home } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ActiveLink } from './ActiveLink';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const buildingInfoLinks = [
    { name: 'Recycling', path: '/recycling' },
    { name: 'Bylaws', path: '/bylaws' },
    { name: 'Move In/Out', path: '/move-in-out' },
    { name: 'Calendar', path: '/calendar' },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <ActiveLink href="/" className="flex items-center">
              <img 
                src="/lovable-uploads/dee11acd-11f1-4587-a514-c315a952b4e8.png" 
                alt="Spectrum 4 Logo" 
                className="h-10 mr-3" 
              />
            </ActiveLink>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            {/* Home link */}
            <ActiveLink 
              href="/"
              className="text-gray-700 hover:text-spectrum-blue px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
              activeClassName="text-spectrum-800 border-b-2 border-spectrum-800 font-medium"
            >
              <Home className="mr-1 h-4 w-4" />
              Home
            </ActiveLink>

            {/* Building Info Dropdown - positioned after Home */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="text-gray-700 hover:text-spectrum-blue px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
                >
                  Building Info
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-white">
                {buildingInfoLinks.map((link) => (
                  <DropdownMenuItem key={link.name} asChild>
                    <ActiveLink 
                      href={link.path}
                      className="w-full text-gray-700 hover:text-spectrum-blue"
                    >
                      {link.name}
                    </ActiveLink>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Documents link */}
            <ActiveLink 
              href="/documents"
              className="text-gray-700 hover:text-spectrum-blue px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
              activeClassName="text-spectrum-800 border-b-2 border-spectrum-800 font-medium"
            >
              <Download className="mr-1 h-4 w-4" />
              Documents
            </ActiveLink>

            {/* Gallery link */}
            <ActiveLink 
              href="/gallery"
              className="text-gray-700 hover:text-spectrum-blue px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
              activeClassName="text-spectrum-800 border-b-2 border-spectrum-800 font-medium"
            >
              <GalleryHorizontal className="mr-1 h-4 w-4" />
              Gallery
            </ActiveLink>

            {/* Calendar link */}
            <ActiveLink 
              href="/calendar"
              className="text-gray-700 hover:text-spectrum-blue px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
              activeClassName="text-spectrum-800 border-b-2 border-spectrum-800 font-medium"
            >
              <Calendar className="mr-1 h-4 w-4" />
              Calendar
            </ActiveLink>

            {/* Contact link */}
            <ActiveLink 
              href="/contact"
              className="text-gray-700 hover:text-spectrum-blue px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
              activeClassName="text-spectrum-800 border-b-2 border-spectrum-800 font-medium"
            >
              <Mail className="mr-1 h-4 w-4" />
              Contact
            </ActiveLink>

            <ActiveLink 
              href="/admin" 
              className="text-gray-700 hover:text-spectrum-blue px-3 py-2 rounded-md text-sm font-medium transition-colors"
              activeClassName="text-spectrum-800 border-b-2 border-spectrum-800 font-medium"
            >
              Admin
            </ActiveLink>
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
          "md:hidden absolute z-50 w-full bg-white shadow-md transition-all duration-300 ease-in-out pb-3",
          isMenuOpen ? "max-h-[500px] overflow-y-auto opacity-100" : "max-h-0 opacity-0 invisible"
        )}
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          {/* Home Link */}
          <ActiveLink
            href="/"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-spectrum-blue hover:bg-gray-50 flex items-center"
            onClick={() => setIsMenuOpen(false)}
            activeClassName="text-spectrum-800 bg-gray-50 font-medium"
          >
            <Home className="mr-2 h-4 w-4" />
            Home
          </ActiveLink>
          
          {/* Building Info Mobile Dropdown */}
          <div className="px-3 py-2 text-base font-medium text-gray-700">
            Building Info
          </div>
          <div className="pl-4 space-y-1">
            {buildingInfoLinks.map((link) => (
              <ActiveLink
                key={link.name}
                href={link.path}
                className="block px-3 py-1.5 rounded-md text-sm font-medium text-gray-600 hover:text-spectrum-blue hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
                activeClassName="text-spectrum-800 bg-gray-50 font-medium"
              >
                {link.name}
              </ActiveLink>
            ))}
          </div>
          
          {/* Documents Link */}
          <ActiveLink
            href="/documents"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-spectrum-blue hover:bg-gray-50 flex items-center"
            onClick={() => setIsMenuOpen(false)}
            activeClassName="text-spectrum-800 bg-gray-50 font-medium"
          >
            <Download className="mr-2 h-4 w-4" />
            Documents
          </ActiveLink>
          
          {/* Gallery Link */}
          <ActiveLink
            href="/gallery"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-spectrum-blue hover:bg-gray-50 flex items-center"
            onClick={() => setIsMenuOpen(false)}
            activeClassName="text-spectrum-800 bg-gray-50 font-medium"
          >
            <GalleryHorizontal className="mr-2 h-4 w-4" />
            Gallery
          </ActiveLink>
          
          {/* Calendar Link */}
          <ActiveLink
            href="/calendar"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-spectrum-blue hover:bg-gray-50 flex items-center"
            onClick={() => setIsMenuOpen(false)}
            activeClassName="text-spectrum-800 bg-gray-50 font-medium"
          >
            <Calendar className="mr-2 h-4 w-4" />
            Calendar
          </ActiveLink>
          
          {/* Contact Link */}
          <ActiveLink
            href="/contact"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-spectrum-blue hover:bg-gray-50 flex items-center"
            onClick={() => setIsMenuOpen(false)}
            activeClassName="text-spectrum-800 bg-gray-50 font-medium"
          >
            <Mail className="mr-2 h-4 w-4" />
            Contact
          </ActiveLink>
          
          <ActiveLink
            href="/admin"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-spectrum-blue hover:bg-gray-50"
            onClick={() => setIsMenuOpen(false)}
            activeClassName="text-spectrum-800 bg-gray-50 font-medium"
          >
            Admin
          </ActiveLink>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
