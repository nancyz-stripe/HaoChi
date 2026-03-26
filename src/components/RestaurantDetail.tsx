"use client";

import { Restaurant } from "@/types";
import { getRecommendationsForRestaurant } from "@/data";
import { CopyButton } from "./CopyButton";
import { DishCard } from "./DishCard";
import { ArrowLeft, MapPin, Globe } from "lucide-react";
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
    <div className="pb-10">
      {/* Back */}
      <Link
        href={`/city/${city?.slug}`}
        className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mb-5 touch-manipulation active:scale-95"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        {city?.name_en}
      </Link>

      {/* Header */}
      <div>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h1 className="text-xl font-bold text-foreground leading-tight">
              {restaurant.name_en}
            </h1>
            <div className="mt-1.5 flex items-center gap-2 flex-wrap">
              <span className="text-lg text-foreground/60">{restaurant.name_zh}</span>
              <CopyButton text={restaurant.name_zh} label="Name" variant="inline" />
            </div>
          </div>
          {restaurant.featured && (
            <span className="shrink-0 rounded-md bg-foreground px-2 py-0.5 text-[10px] font-semibold text-background mt-1">
              Pick
            </span>
          )}
        </div>

        <div className="mt-2.5 flex items-center gap-2 text-xs text-muted-foreground flex-wrap">
          <span className="font-semibold text-foreground">{restaurant.price_band}</span>
          <span className="text-border">·</span>
          <span>{restaurant.cuisine_type}</span>
          <span className="text-border">·</span>
          <span className="inline-flex items-center gap-1">
            <Globe className="h-3 w-3" />
            {englishLabel}
          </span>
          <span className="text-border">·</span>
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {restaurant.area}
          </span>
        </div>
      </div>

      {/* Traveler helper — the key mobile feature */}
      <div className="mt-5 rounded-lg border border-border bg-card overflow-hidden">
        <div className="px-4 py-3 border-b border-border bg-secondary/50">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            Copy for Didi / Amap / WeChat
          </p>
        </div>
        <div className="divide-y divide-border">
          <div className="px-4 py-3 flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[10px] text-muted-foreground">Restaurant</p>
              <p className="text-base font-medium text-foreground mt-0.5 truncate">{restaurant.name_zh}</p>
            </div>
            <CopyButton text={restaurant.name_zh} label="Name" />
          </div>
          <div className="px-4 py-3 flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[10px] text-muted-foreground">Address</p>
              <p className="text-sm font-medium text-foreground mt-0.5">{restaurant.address_zh}</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">{restaurant.address_en}</p>
            </div>
            <CopyButton text={restaurant.address_zh} label="Address" />
          </div>
        </div>
      </div>

      {/* Why go */}
      <div className="mt-5">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {restaurant.why_go}
        </p>
      </div>

      {/* Tags */}
      {restaurant.best_for.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1">
          {restaurant.best_for.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-secondary px-2 py-0.5 text-[11px] text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* What to order */}
      <div className="mt-6">
        <h2 className="text-sm font-semibold text-foreground">What to order</h2>
        <div className="mt-3 space-y-2">
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
