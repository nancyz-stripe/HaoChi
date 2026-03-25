"use client";

import { Restaurant } from "@/types";
import { CopyButton } from "./CopyButton";
import { MapPin, Star, Globe, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { cities } from "@/data/cities";

interface RestaurantCardProps {
  restaurant: Restaurant;
  onClick?: () => void;
}

export function RestaurantCard({ restaurant, onClick }: RestaurantCardProps) {
  const city = cities.find((c) => c.id === restaurant.city_id);

  const friendlinessLabel = (score: number) => {
    if (score >= 4) return "Very traveler-friendly";
    if (score >= 3) return "Traveler-friendly";
    return "Local experience";
  };

  return (
    <Link
      href={`/city/${city?.slug}/restaurant/${restaurant.id}`}
      onClick={onClick}
      className="group block rounded-xl border border-border bg-card overflow-hidden transition-all hover:shadow-lg"
    >
      <div className="aspect-[16/9] bg-gradient-to-br from-amber-100 to-orange-100 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center text-amber-600/30">
          <MapPin className="h-12 w-12" />
        </div>
        {restaurant.featured && (
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-500 px-2.5 py-1 text-xs font-semibold text-white shadow-sm">
              <Star className="h-3 w-3 fill-current" />
              Featured
            </span>
          </div>
        )}
        <div className="absolute top-3 right-3">
          <span className="rounded-full bg-white/90 backdrop-blur-sm px-2.5 py-1 text-xs font-medium text-foreground">
            {restaurant.price_band}
          </span>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-foreground group-hover:text-amber-700 transition-colors">
              {restaurant.name_en}
            </h3>
            <div className="mt-0.5 flex items-center gap-2">
              <span className="text-base text-foreground/70">{restaurant.name_zh}</span>
            </div>
          </div>
        </div>

        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
          {restaurant.short_description}
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {restaurant.area}
          </span>
          <span className="text-border">·</span>
          <span>{restaurant.cuisine_type}</span>
          <span className="text-border">·</span>
          <span className="inline-flex items-center gap-1">
            {friendlinessLabel(restaurant.traveler_friendliness_score)}
          </span>
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {restaurant.best_for.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-secondary px-2 py-0.5 text-xs text-secondary-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
