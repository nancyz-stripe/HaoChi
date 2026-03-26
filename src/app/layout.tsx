import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hao Chi! Eat around China with Nancy",
  description:
    "Discover authentic local food in China. Find the best restaurants, know what to order, and navigate with confidence.",
  openGraph: {
    title: "Hao Chi! Eat around China with Nancy",
    description:
      "Discover authentic local food in China. Find the best restaurants, know what to order, and navigate with confidence.",
  },
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
