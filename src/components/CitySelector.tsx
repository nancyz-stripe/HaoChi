"use client";

import { City } from "@/types";
import { cities } from "@/data/cities";
import { cn } from "@/lib/utils";
import { MapPin } from "lucide-react";

interface CitySelectorProps {
  selectedCity: City | null;
  onSelect: (city: City) => void;
}

export function CitySelector({ selectedCity, onSelect }: CitySelectorProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
      {cities.map((city) => (
        <button
          key={city.id}
          onClick={() => onSelect(city)}
          className={cn(
            "flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all",
            selectedCity?.id === city.id
              ? "bg-amber-500 text-white shadow-md shadow-amber-200"
              : "bg-card border border-border text-foreground hover:bg-accent"
          )}
        >
          <MapPin className="h-3.5 w-3.5" />
          <span>{city.name_en}</span>
          <span className="text-xs opacity-70">{city.name_zh}</span>
        </button>
      ))}
    </div>
  );
}
