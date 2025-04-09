'use client';
import React from "react";
import Header from "./Header";

interface ClientLayoutProps {
  children: React.ReactNode;
}

const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-light-neutral-offWhite dark:bg-primary-deepest transition-colors">
      <Header />
      <main className="container mx-auto px-4 py-8">{children}</main>          
<footer className="p-5 text-center text-sm bg-primary-dark text-light-text-primary">
  <p>© 2025 Tony Banuchi. All rights reserved.</p>
</footer>
</div>
  );
};

export default ClientLayout;