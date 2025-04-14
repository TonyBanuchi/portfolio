'use client';

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { Theme } from '@/theme/types';
import { lightTheme, darkTheme } from '@/theme/colors';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // This will run only on the client side
  const [mounted, setMounted] = useState(false);
  
  // Default to light theme during SSR to avoid hydration mismatch
  const [theme, setTheme] = useState<Theme>(lightTheme);

  // Toggle between light and dark theme
  const toggleTheme = () => {
    const newTheme = theme.isDark ? lightTheme : darkTheme;
    setTheme(newTheme);
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', newTheme.name);
    }
  };

  // Initialize theme from localStorage and system preference
  useEffect(() => {
    setMounted(true);
    
    const prefersDarkMode = window.matchMedia && 
      window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const savedTheme = localStorage.getItem('theme');
    
    const initialTheme = savedTheme === 'dark' || (!savedTheme && prefersDarkMode) 
      ? darkTheme 
      : lightTheme;
    
    setTheme(initialTheme);
  }, []);

  // Apply theme class to document
  useEffect(() => {
    if (mounted) {
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(theme.name);
    }
  }, [theme, mounted]);

  // Provide a default theme during SSR to avoid hydration issues
  const value = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// Export context hook for easy use
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeProvider;