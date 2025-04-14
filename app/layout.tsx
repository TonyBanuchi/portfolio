import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";
import ThemeProvider from '@/components/ThemeProvider';
import ClientLayout from '@/components/ClientLayout';


const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  display: "swap",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  weight: "400",
  variable: "--font-space-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tony Banuchi - Portfolio",
  description: "Professional Portfolio for Tony Banuchi, Senior Full-Stack Software Engineer.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${spaceMono.variable}`}
      >
        {/* ThemeProvider is a client component, but RootLayout remains a server component */}
        <ThemeProvider>
          {/* ClientLayout contains header, footer, and manages theme styles */}
          <ClientLayout>
            {children}
          </ClientLayout>
        </ThemeProvider>
      </body>
    </html>
  );
};