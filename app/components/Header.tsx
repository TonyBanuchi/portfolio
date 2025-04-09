'use client';
import React from 'react';
import { useTheme } from '../theme/ThemeContext';
import { Sun, Moon } from 'lucide-react';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <header className="flex justify-between items-center p-4 bg-primary-dark text-white">
      <div className="font-bold text-xl">Tony Banuchi</div>
      
      <div className="flex items-center gap-6">
        <nav className="hidden md:flex gap-5">
          <a href="#home" className="hover:text-accent-teal transition-colors">Home</a>
          <a href="#projects" className="hover:text-accent-teal transition-colors">Projects</a>
          <a href="#about-me" className="hover:text-accent-teal transition-colors">About</a>
          <a href="#contact" className="text-accent-teal">Contact</a>
        </nav>
        
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-full bg-opacity-20 bg-white hover:bg-opacity-30 transition"
          aria-label={theme.isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme.isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </header>
  );
};

export default Header;