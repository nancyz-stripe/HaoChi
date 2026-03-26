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
      <body className="min-h-full flex flex-col">
        {/* Desktop gate — visible only on lg+ screens */}
        <div className="hidden lg:flex fixed inset-0 z-[9999] bg-white items-center justify-center">
          <div className="text-center px-6">
            <p className="text-[28px] font-medium text-[#0A0A0A]">Hao Chi!</p>
            <p className="mt-2 text-[16px] text-[#717375] leading-relaxed max-w-[360px]">
              This experience is designed for mobile.
              <br />
              Please visit on your phone to explore.
            </p>
          </div>
        </div>
        {/* App content — hidden on lg+ screens */}
        <div className="lg:hidden flex-1 flex flex-col">{children}</div>
      </body>
    </html>
  );
}
