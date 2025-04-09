import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";
import ClientLayout from "./components/ClientLayout";
import ClientThemeProvider from "./theme/ClientThemeProvider";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-sans",
  display: "swap",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  weight: "400",
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tony Banuchi - Portfolio",
  description: "Professional Portfolio for Tony Banuchi, Senior Full-Stack software Engineer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${spaceMono.variable} antialiased`}
      >
        <ClientThemeProvider>
          <ClientLayout>
            {children}
          </ClientLayout>
        </ClientThemeProvider>
          

      </body>
    </html>
  );
}
