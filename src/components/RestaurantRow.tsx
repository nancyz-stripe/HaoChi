"use client";

import { Restaurant } from "@/types";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import { cities } from "@/data/cities";

interface RestaurantRowProps {
  restaurant: Restaurant;
}

export function RestaurantRow({ restaurant }: RestaurantRowProps) {
  const city = cities.find((c) => c.id === restaurant.city_id);

  return (
    <Link
      href={`/city/${city?.slug}/restaurant/${restaurant.id}`}
      className="flex items-start justify-between gap-3 py-4 touch-manipulation active:bg-accent/50 transition-colors"
    >
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="text-[15px] font-semibold text-foreground leading-tight">
            {restaurant.name_en}
          </p>
          <span className="text-[15px] text-muted-foreground">{restaurant.name_zh}</span>
        </div>
        <p className="mt-1 text-sm text-muted-foreground leading-relaxed line-clamp-1">
          {restaurant.short_description}
        </p>
      </div>
      {restaurant.featured && (
        <span className="shrink-0 mt-0.5 inline-flex items-center gap-1 text-amber-600 text-xs font-semibold">
          <Sparkles className="h-3 w-3" />
          LOCAL GEM
        </span>
      )}
    </Link>
  );
}
