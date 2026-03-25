"use client";

import { Restaurant } from "@/types";
import { getRecommendationsForRestaurant } from "@/data";
import { CopyButton } from "./CopyButton";
import { DishCard } from "./DishCard";
import { SpiceBadge } from "./SpiceBadge";
import {
  ArrowLeft,
  MapPin,
  Star,
  Globe,
  Smartphone,
  Utensils,
} from "lucide-react";
import Link from "next/link";
import { cities } from "@/data/cities";

interface RestaurantDetailProps {
  restaurant: Restaurant;
}

export function RestaurantDetail({ restaurant }: RestaurantDetailProps) {
  const city = cities.find((c) => c.id === restaurant.city_id);
  const recs = getRecommendationsForRestaurant(restaurant.id);

  const englishLabel = {
    none: "No English",
    basic: "Basic English",
    good: "Good English",
    excellent: "Excellent English",
  }[restaurant.english_support_level];

  return (
    <div className="pb-8">
      {/* Back nav */}
      <Link
        href={`/city/${city?.slug}`}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to {city?.name_en}
      </Link>

      {/* Hero area */}
      <div className="rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 aspect-[21/9] mb-6 flex items-center justify-center relative overflow-hidden">
        <MapPin className="h-16 w-16 text-amber-600/20" />
        {restaurant.featured && (
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500 px-3 py-1.5 text-xs font-semibold text-white shadow-lg">
              <Star className="h-3 w-3 fill-current" />
              Featured Pick
            </span>
          </div>
        )}
      </div>

      {/* Restaurant header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          {restaurant.name_en}
        </h1>
        <div className="mt-2 flex items-center gap-2 flex-wrap">
          <span className="text-xl text-foreground/70">{restaurant.name_zh}</span>
          <CopyButton text={restaurant.name_zh} label="Chinese name" />
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{restaurant.price_band}</span>
          <span className="text-border">·</span>
          <span>{restaurant.cuisine_type}</span>
          <span className="text-border">·</span>
          <span className="inline-flex items-center gap-1">
            <Globe className="h-3.5 w-3.5" />
            {englishLabel}
          </span>
        </div>
      </div>

      {/* Address & traveler helper */}
      <div className="mt-6 rounded-xl border border-border bg-card p-5">
        <div className="flex items-center gap-2 mb-3">
          <Smartphone className="h-4 w-4 text-amber-500" />
          <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground">
            Traveler Helper
          </h2>
        </div>
        <p className="text-xs text-muted-foreground mb-4">
          Copy these to use in Didi, Amap, WeChat, Meituan, or Dianping
        </p>

        <div className="space-y-3">
          <div className="flex items-start justify-between gap-3 p-3 rounded-lg bg-secondary/50">
            <div>
              <p className="text-xs text-muted-foreground font-medium">Restaurant name</p>
              <p className="text-lg font-medium text-foreground mt-0.5">{restaurant.name_zh}</p>
            </div>
            <CopyButton text={restaurant.name_zh} label="Restaurant name" />
          </div>

          <div className="flex items-start justify-between gap-3 p-3 rounded-lg bg-secondary/50">
            <div>
              <p className="text-xs text-muted-foreground font-medium">Address</p>
              <p className="text-base font-medium text-foreground mt-0.5">{restaurant.address_zh}</p>
              <p className="text-xs text-muted-foreground mt-1">{restaurant.address_en}</p>
            </div>
            <CopyButton text={restaurant.address_zh} label="Address" />
          </div>
        </div>
      </div>

      {/* Why go */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold text-foreground mb-2">Why go here</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {restaurant.why_go}
        </p>
      </div>

      {/* Best for tags */}
      <div className="mt-4 flex flex-wrap gap-2">
        {restaurant.best_for.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* What to order */}
      <div className="mt-8">
        <div className="flex items-center gap-2 mb-4">
          <Utensils className="h-5 w-5 text-amber-500" />
          <h2 className="text-lg font-semibold text-foreground">What to order</h2>
        </div>
        <div className="grid gap-4">
          {recs.map((rec) => (
            <DishCard
              key={rec.dish_id}
              dish={rec.dish}
              recommendation={rec.why_this_version}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
