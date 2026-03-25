"use client";

import { Restaurant } from "@/types";
import { RestaurantDetail } from "@/components/RestaurantDetail";
import Link from "next/link";

export function RestaurantPageClient({
  restaurant,
}: {
  restaurant: Restaurant;
}) {
  return (
    <div className="min-h-[100dvh] bg-background">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-border bg-card/80 backdrop-blur-sm">
        <div className="px-4 py-3 flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🥢</span>
            <h1 className="text-lg font-bold tracking-tight text-foreground">
              China First Bite
            </h1>
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6">
        <RestaurantDetail restaurant={restaurant} />
      </main>
    </div>
  );
}
