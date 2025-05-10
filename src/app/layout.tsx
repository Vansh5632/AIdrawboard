import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { cn } from "@/lib/utils";

// Load Inter font with additional weights
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Collaborative Whiteboard App",
  description: "An interactive whiteboard with AI analysis and real-time collaboration",
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
    <html lang="en" className={`${inter.variable} font-sans dark`} suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen w-full overflow-hidden bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-900 text-foreground",
          "antialiased"
        )}
      >
        {children}
      </body>
    </html>
  );
}