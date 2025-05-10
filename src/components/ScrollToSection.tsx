
import React, { useEffect } from 'react';

interface ScrollToSectionProps {
  hash: string;
}

export const ScrollToSection: React.FC<ScrollToSectionProps> = ({ hash }) => {
  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        // Wait for any accordion items to expand
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [hash]);

  return null;
};
