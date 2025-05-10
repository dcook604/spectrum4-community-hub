
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";

interface ActiveLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
  onClick?: () => void;
}

export const ActiveLink: React.FC<ActiveLinkProps> = ({ 
  href, 
  children, 
  className = "", 
  activeClassName = "text-spectrum-800 font-medium", 
  onClick 
}) => {
  const location = useLocation();
  const isActive = location.pathname === href || 
    (href !== '/' && location.pathname.startsWith(href));
  
  return (
    <Link 
      to={href}
      className={cn(className, isActive && activeClassName)}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};
