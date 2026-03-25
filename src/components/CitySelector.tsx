"use client";

import { City } from "@/types";
import { cities } from "@/data/cities";
import { cn } from "@/lib/utils";

interface CitySelectorProps {
  selectedCity: City | null;
  onSelect: (city: City) => void;
}

export function CitySelector({ selectedCity, onSelect }: CitySelectorProps) {
  return (
    <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
      {cities.map((city) => (
        <button
          key={city.id}
          onClick={() => onSelect(city)}
          className={cn(
            "whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium transition-all",
            selectedCity?.id === city.id
              ? "bg-foreground text-background"
              : "border border-border text-muted-foreground hover:text-foreground hover:bg-accent"
          )}
        >
          {city.name_en}
        </button>
      ))}
    </div>
  );
}
