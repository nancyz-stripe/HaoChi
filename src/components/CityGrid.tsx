"use client";

import { City } from "@/types";
import { cities } from "@/data/cities";

// Placeholder images — gradient backgrounds representing each city's vibe
const cityImages: Record<string, { gradient: string; emoji: string }> = {
  chongqing: { gradient: "from-orange-900 to-red-800", emoji: "🌃" },
  zhangjiajie: { gradient: "from-emerald-800 to-green-900", emoji: "🏔️" },
  furong: { gradient: "from-amber-800 to-yellow-900", emoji: "🏮" },
  xian: { gradient: "from-stone-700 to-stone-800", emoji: "🏛️" },
  beijing: { gradient: "from-red-800 to-amber-900", emoji: "🏯" },
};

interface CityGridProps {
  onSelect: (city: City) => void;
}

export function CityGrid({ onSelect }: CityGridProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {cities.map((city, i) => {
        const img = cityImages[city.slug] || { gradient: "from-neutral-700 to-neutral-800", emoji: "📍" };
        const isLast = cities.length % 2 !== 0 && i === cities.length - 1;

        return (
          <button
            key={city.id}
            onClick={() => onSelect(city)}
            className={`group text-left touch-manipulation active:scale-[0.97] transition-transform ${
              isLast ? "col-span-2 max-w-[calc(50%-6px)] mx-auto" : ""
            }`}
          >
            <div
              className={`aspect-[4/3] rounded-xl bg-gradient-to-br ${img.gradient} overflow-hidden relative`}
            >
              <div className="absolute inset-0 flex items-center justify-center text-4xl opacity-30">
                {img.emoji}
              </div>
            </div>
            <p className="mt-2 text-sm font-medium text-foreground text-center">
              {city.name_en}{" "}
              <span className="text-muted-foreground">{city.name_zh}</span>
            </p>
          </button>
        );
      })}
    </div>
  );
}
