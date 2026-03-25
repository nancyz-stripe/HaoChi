"use client";

import { City, Dish } from "@/types";
import {
  getSignatureDishes,
  getFirstMealDishes,
  getRestaurantsByCity,
  getFirstTimerDishes,
  getMildDishes,
} from "@/data";
import { DishCard } from "./DishCard";
import { RestaurantCard } from "./RestaurantCard";
import { SpiceBadge } from "./SpiceBadge";
import { Utensils, Sparkles, Shield, Flame } from "lucide-react";
import { useState } from "react";

interface CityPanelProps {
  city: City;
}

type DishFilter = "all" | "first-timer" | "mild" | "adventurous";

export function CityPanel({ city }: CityPanelProps) {
  const [dishFilter, setDishFilter] = useState<DishFilter>("all");

  const signatureDishes = getSignatureDishes(city);
  const firstMealDishes = getFirstMealDishes(city);
  const cityRestaurants = getRestaurantsByCity(city.id);

  const filteredDishes = (() => {
    switch (dishFilter) {
      case "first-timer":
        return getFirstTimerDishes(city.id);
      case "mild":
        return getMildDishes(city.id);
      case "adventurous":
        return signatureDishes.filter((d) => d.adventurous);
      default:
        return signatureDishes;
    }
  })();

  const filters: { key: DishFilter; label: string; icon: React.ReactNode }[] = [
    { key: "all", label: "All dishes", icon: <Utensils className="h-3.5 w-3.5" /> },
    { key: "first-timer", label: "Beginner-friendly", icon: <Shield className="h-3.5 w-3.5" /> },
    { key: "mild", label: "Low spice", icon: <Sparkles className="h-3.5 w-3.5" /> },
    { key: "adventurous", label: "Adventurous", icon: <Flame className="h-3.5 w-3.5" /> },
  ];

  return (
    <div className="space-y-8 pb-8">
      {/* City header */}
      <div>
        <div className="flex items-baseline gap-3">
          <h1 className="text-3xl font-bold text-foreground">{city.name_en}</h1>
          <span className="text-2xl text-foreground/50">{city.name_zh}</span>
        </div>
        <p className="mt-3 text-base text-muted-foreground leading-relaxed">
          {city.short_intro}
        </p>
      </div>

      {/* Food identity */}
      <div className="rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 p-5">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-amber-800">
          Food Identity
        </h2>
        <p className="mt-2 text-sm text-amber-900/80 leading-relaxed">
          {city.food_identity}
        </p>
      </div>

      {/* Start with these dishes */}
      {firstMealDishes.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-5 w-5 text-amber-500" />
            <h2 className="text-lg font-semibold text-foreground">
              Start with these dishes
            </h2>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Your first meal in {city.name_en}? These are the safe, iconic picks.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {firstMealDishes.map((dish) => (
              <DishCard key={dish.id} dish={dish} compact />
            ))}
          </div>
        </div>
      )}

      {/* Signature dishes with filters */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Signature Dishes
        </h2>
        <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setDishFilter(f.key)}
              className={`flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                dishFilter === f.key
                  ? "bg-foreground text-background"
                  : "bg-secondary text-secondary-foreground hover:bg-accent"
              }`}
            >
              {f.icon}
              {f.label}
            </button>
          ))}
        </div>
        {filteredDishes.length === 0 ? (
          <p className="text-sm text-muted-foreground py-8 text-center">
            No dishes match this filter in {city.name_en}.
          </p>
        ) : (
          <div className="grid gap-4">
            {filteredDishes.map((dish) => (
              <DishCard key={dish.id} dish={dish} />
            ))}
          </div>
        )}
      </div>

      {/* Restaurants */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Where to Eat
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          {cityRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </div>
    </div>
  );
}
