'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useTheme } from './ThemeProvider';
import { usePathname } from 'next/navigation';
import { Sun, Moon, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/projects', label: 'Projects' },
  ];
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  return (
    <header className="sticky top-0 z-10 bg-brand-primary text-light-text-inverse dark:text-dark-text-primary shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo/brand */}
          <Link href="/" className="font-bold text-xl">
            Tony Banuchi
          </Link>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map(link => {
              const isActive = pathname === link.href;
              return (
                <Link 
                  key={link.href} 
                  href={link.href}
                  className={`${
                    isActive 
                      ? 'text-accent-secondary' 
                      : 'text-light-text-inverse dark:text-dark-text-primary hover:text-accent-secondary'
                  } transition-colors`}
                >
                  {link.label}
                </Link>
              );
            })}
            
            {/* Theme toggle button */}
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-brand-secondary transition-colors"
              aria-label={theme.isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme.isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </nav>
          
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button 
              onClick={toggleTheme}
              className="p-2 mr-2 rounded-full hover:bg-brand-secondary transition-colors"
              aria-label={theme.isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme.isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-full hover:bg-brand-secondary transition-colors"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <nav className="md:hidden py-4 px-4 bg-brand-secondary dark:bg-brand-dark">
          <div className="flex flex-col space-y-3">
            {navLinks.map(link => {
              const isActive = pathname === link.href;
              return (
                <Link 
                  key={link.href} 
                  href={link.href}
                  className={`${
                    isActive 
                      ? 'text-accent-secondary' 
                      : 'text-light-text-inverse dark:text-dark-text-primary hover:text-accent-secondary'
                  } py-2 transition-colors`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;