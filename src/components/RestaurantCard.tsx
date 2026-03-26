"use client";

import { Restaurant } from "@/types";
import { MapPin } from "lucide-react";
import Link from "next/link";
import { cities } from "@/data/cities";

interface RestaurantCardProps {
  restaurant: Restaurant;
  onClick?: () => void;
}

export function RestaurantCard({ restaurant, onClick }: RestaurantCardProps) {
  const city = cities.find((c) => c.id === restaurant.city_id);

  return (
    <Link
      href={`/city/${city?.slug}/restaurant/${restaurant.id}`}
      onClick={onClick}
      className="group block rounded-lg border border-border bg-card overflow-hidden transition-all active:scale-[0.98] touch-manipulation"
    >
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-foreground leading-tight">
                {restaurant.name_en}
              </p>
              {restaurant.featured && (
                <span className="shrink-0 rounded-md bg-foreground px-1.5 py-0.5 text-[10px] font-semibold text-background">
                  Pick
                </span>
              )}
            </div>
            <p className="mt-0.5 text-sm text-foreground/60">{restaurant.name_zh}</p>
          </div>
          <span className="shrink-0 text-xs font-medium text-muted-foreground">
            {restaurant.price_band}
          </span>
        </div>

        <p className="mt-2 text-xs text-muted-foreground leading-relaxed line-clamp-2">
          {restaurant.short_description}
        </p>

        <div className="mt-3 flex items-center gap-1.5 text-[11px] text-muted-foreground">
          <MapPin className="h-3 w-3 shrink-0" />
          <span>{restaurant.area}</span>
          <span className="text-border">·</span>
          <span>{restaurant.cuisine_type}</span>
        </div>

        {restaurant.best_for.length > 0 && (
          <div className="mt-2.5 flex flex-wrap gap-1">
            {restaurant.best_for.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-secondary px-1.5 py-0.5 text-[10px] text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
