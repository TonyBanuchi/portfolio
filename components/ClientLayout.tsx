"use client";

import React from "react";
import { useTheme } from "./ThemeProvider";
import Header from "./Header";
import Link from "next/link";
import { FaAt, FaGithub, FaLinkedin } from "react-icons/fa";

interface ClientLayoutProps {
  children: React.ReactNode;
}

const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { theme } = useTheme();

  return (
    <div className="flex flex-col min-h-screen font-sans">
      <Header />

      {/* Main content */}
      <div className="flex-grow">{children}</div>

      {/* Footer */}
      <footer className="py-8 px-4 bg-brand-primary text-light-text-inverse dark:text-dark-text-primary">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Brand section */}
            <div>
              <h3 className="text-xl font-bold mb-4">Tony Banuchi</h3>
              <p className="text-light-text-inverse dark:text-dark-text-secondary mb-4">
                Software engineer passionate about creating clean, efficient,
                and accessible web experiences. I am currently open to new opportunities and collaborations.I can
                help your organization succeed!
              </p>
            </div>

            {/* Contact section */}
            <div className="justify-items-start md:justify-items-center">
              <h3 className="text-lg font-bold mb-4">Contact Me</h3>
              <div className="flex flex-col space-y-2">
                <a
                  href="mailto:tony.banuchi@gmail.com"
                  target="_blank"
                  className="flex items-center gap-2 text-light-text-inverse dark:text-dark-text-secondary hover:text-accent-secondary transition-colors"
                >
                  <FaAt size={18} />
                  <span>Email Me</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/tony-banuchi-developer/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-light-text-inverse dark:text-dark-text-secondary hover:text-accent-secondary transition-colors"
                >
                  <FaLinkedin size={18} />
                  <span>LinkedIn</span>
                </a>
                <a
                  href="https://github.com/TonyBanuchi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-light-text-inverse dark:text-dark-text-secondary hover:text-accent-secondary transition-colors"
                >
                  <FaGithub size={18} />
                  <span>GitHub</span>
                </a>
              </div>
            </div>

            {/* Quick links */}
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <nav className="flex flex-col space-y-2">
                <Link
                  href="/"
                  className="text-light-text-inverse dark:text-dark-text-secondary hover:text-accent-secondary transition-colors"
                >
                  Home
                </Link>
                <Link
                  href="/projects"
                  className="text-light-text-inverse dark:text-dark-text-secondary hover:text-accent-secondary transition-colors"
                >
                  Projects
                </Link>
                <Link
                  href="/about"
                  className="text-light-text-inverse dark:text-dark-text-secondary hover:text-accent-secondary transition-colors"
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="text-light-text-inverse dark:text-dark-text-secondary hover:text-accent-secondary transition-colors"
                >
                  Contact
                </Link>
              </nav>
            </div>

            <div className="border-t border-light-state-border dark:border-dark-state-border mt-8 pt-8 text-center text-light-text-inverse dark:text-dark-text-secondary">
              <p>
                © {new Date().getFullYear()} Tony Banuchi. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ClientLayout;