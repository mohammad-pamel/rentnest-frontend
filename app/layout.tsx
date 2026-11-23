
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";

import { cn } from "@/lib/utils";
// import { ThemeProvider } from "@/components/theme-provider";
import { ThemeProvider } from "@/components/shared/theme-provider";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: "RentNest",
    template: "%s | RentNest",
  },
  description:
    "Find your perfect rental home with RentNest. Explore properties, manage rental requests, and enjoy a seamless renting experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("h-full antialiased font-sans", inter.variable)}
    >
      <body className="min-h-screen flex flex-col bg-background text-foreground">
        <ThemeProvider>
          <Toaster
            position="top-right"
            richColors
            closeButton
            duration={4000}
            expand={false}
            theme="system"
          />

          <main className="mx-auto flex min-h-screen w-full flex-1 flex-col">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
