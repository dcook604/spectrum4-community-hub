
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-100 border-t border-gray-200">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <img 
                src="/lovable-uploads/dee11acd-11f1-4587-a514-c315a952b4e8.png" 
                alt="Spectrum 4 Logo" 
                className="h-8 mr-2" 
              />
              <h3 className="text-lg font-semibold text-gray-800">Spectrum 4 Strata</h3>
            </div>
            <p className="text-gray-600">
              A community-focused strata dedicated to providing a safe and enjoyable living environment for all residents.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/recycling" className="text-spectrum-blue hover:text-spectrum-blue/80 transition-colors">Recycling</Link>
              </li>
              <li>
                <Link to="/bylaws" className="text-spectrum-blue hover:text-spectrum-blue/80 transition-colors">Bylaws</Link>
              </li>
              <li>
                <Link to="/contacts" className="text-spectrum-blue hover:text-spectrum-blue/80 transition-colors">Contacts</Link>
              </li>
              <li>
                <Link to="/calendar" className="text-spectrum-blue hover:text-spectrum-blue/80 transition-colors">Calendar</Link>
              </li>
              <li>
                <Link to="/move-in-out" className="text-spectrum-blue hover:text-spectrum-blue/80 transition-colors">Move In/Out</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact</h3>
            <address className="not-italic text-gray-600">
              <p>123 Spectrum Avenue</p>
              <p>Vancouver, BC V6Z 2R4</p>
              <p className="mt-2">
                <a href="mailto:info@spectrum4.strata.com" className="text-spectrum-blue hover:text-spectrum-blue/80 transition-colors">
                  info@spectrum4.strata.com
                </a>
              </p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-6 text-center text-gray-500 text-sm">
          <p>© {currentYear} Spectrum 4 Strata. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
