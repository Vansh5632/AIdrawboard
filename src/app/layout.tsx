import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";

// Load Inter font
const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Collaborative Whiteboard App",
  description: "An interactive whiteboard application with AI analysis and real-time collaboration features",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} font-sans`}>
      <body className="h-screen w-full overflow-hidden bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}