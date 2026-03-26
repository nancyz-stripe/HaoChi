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
      <header className="sticky top-0 z-20 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="px-4 py-3">
          <Link href="/" className="text-base font-semibold tracking-tight text-foreground">
            China First Bite
          </Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 pt-4 pb-6">
        <RestaurantDetail restaurant={restaurant} />
      </main>
    </div>
  );
}
