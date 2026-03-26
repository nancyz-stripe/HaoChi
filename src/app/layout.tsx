import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "China First Bite — Local Food Guide for Travelers",
  description:
    "Discover authentic local food in China. Find the best restaurants, know what to order, and navigate with confidence. Built for first-time travelers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
