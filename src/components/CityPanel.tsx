"use client";

import { City } from "@/types";
import {
  getSignatureDishes,
  getFirstMealDishes,
  getRestaurantsByCity,
  getFirstTimerDishes,
  getMildDishes,
} from "@/data";
import { DishCard } from "./DishCard";
import { RestaurantCard } from "./RestaurantCard";
import { RestaurantRow } from "./RestaurantRow";
import { useState } from "react";

interface CityPanelProps {
  city: City;
  variant?: "full" | "sheet";
  selectedRestaurantId?: string | null;
  onRestaurantSelect?: (restaurantId: string) => void;
}

type DishFilter = "all" | "first-timer" | "mild" | "adventurous";

export function CityPanel({ city, variant = "full", selectedRestaurantId, onRestaurantSelect }: CityPanelProps) {
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

  const filters: { key: DishFilter; label: string }[] = [
    { key: "all", label: "All" },
    { key: "first-timer", label: "Beginner" },
    { key: "mild", label: "Low spice" },
    { key: "adventurous", label: "Adventurous" },
  ];

  // Sheet variant: simplified restaurant list for bottom sheet on map
  if (variant === "sheet") {
    // Sort selected restaurant to top
    const sortedRestaurants = selectedRestaurantId
      ? [
          ...cityRestaurants.filter((r) => r.id === selectedRestaurantId),
          ...cityRestaurants.filter((r) => r.id !== selectedRestaurantId),
        ]
      : cityRestaurants;

    return (
      <div>
        <h2 className="text-[16px] font-medium leading-[22px] text-[#1A2C44]">
          Restaurants in {city.name_en}
        </h2>
        <div className="mt-3 flex flex-col gap-3">
          {sortedRestaurants.map((restaurant) => (
            <RestaurantRow
              key={restaurant.id}
              restaurant={restaurant}
              selected={restaurant.id === selectedRestaurantId}
            />
          ))}
        </div>
      </div>
    );
  }

  // Full variant: complete city view
  return (
    <div className="space-y-6 pb-8">
      {/* City header */}
      <div>
        <div className="flex items-baseline gap-2">
          <h1 className="text-xl font-bold text-foreground lg:text-2xl">{city.name_en}</h1>
          <span className="text-lg text-foreground/40">{city.name_zh}</span>
        </div>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
          {city.short_intro}
        </p>
      </div>

      {/* Food identity */}
      <div className="rounded-lg bg-secondary p-4">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          Food identity
        </p>
        <p className="mt-2 text-sm text-foreground/80 leading-relaxed">
          {city.food_identity}
        </p>
      </div>

      {/* Start with these */}
      {firstMealDishes.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold text-foreground">
            Start with these
          </h2>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Safe, iconic picks for your first meal here
          </p>
          <div className="mt-3 space-y-2">
            {firstMealDishes.map((dish) => (
              <DishCard key={dish.id} dish={dish} compact />
            ))}
          </div>
        </div>
      )}

      {/* Signature dishes */}
      <div>
        <h2 className="text-sm font-semibold text-foreground">
          Signature dishes
        </h2>
        <div className="mt-2 flex gap-1 overflow-x-auto scrollbar-none pb-1">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setDishFilter(f.key)}
              className={`whitespace-nowrap rounded-md px-2.5 py-1 text-[11px] font-medium transition-all touch-manipulation ${
                dishFilter === f.key
                  ? "bg-foreground text-background"
                  : "bg-secondary text-muted-foreground"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        {filteredDishes.length === 0 ? (
          <p className="text-xs text-muted-foreground py-6 text-center">
            No dishes match this filter.
          </p>
        ) : (
          <div className="mt-3 space-y-2">
            {filteredDishes.map((dish) => (
              <DishCard key={dish.id} dish={dish} />
            ))}
          </div>
        )}
      </div>

      {/* Restaurants */}
      <div>
        <h2 className="text-sm font-semibold text-foreground">
          Where to eat
        </h2>
        <div className="mt-3 space-y-2">
          {cityRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </div>
    </div>
  );
}
