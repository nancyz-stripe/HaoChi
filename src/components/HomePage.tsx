"use client";

import { useState } from "react";
import { City, Restaurant } from "@/types";
import { ChinaMap } from "./ChinaMap";
import { CitySelector } from "./CitySelector";
import { CityPanel } from "./CityPanel";
import { cities } from "@/data/cities";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export function HomePage() {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [showPanel, setShowPanel] = useState(false);
  const router = useRouter();

  const handleCitySelect = (city: City) => {
    setSelectedCity(city);
    setShowPanel(true);
  };

  const handleRestaurantSelect = (restaurant: Restaurant) => {
    const city = cities.find((c) => c.id === restaurant.city_id);
    if (city) {
      router.push(`/city/${city.slug}/restaurant/${restaurant.id}`);
    }
  };

  return (
    <div className="flex h-[100dvh] flex-col">
      {/* Header */}
      <header className="flex-shrink-0 border-b border-border bg-background/80 backdrop-blur-sm z-20">
        <div className="px-4 py-3">
          <div className="flex items-center gap-3">
            <h1 className="text-base font-semibold tracking-tight text-foreground">
              China First Bite
            </h1>
            <span className="text-xs text-muted-foreground hidden sm:inline">
              Local food guide for travelers
            </span>
          </div>
          <div className="mt-2.5">
            <CitySelector selectedCity={selectedCity} onSelect={handleCitySelect} />
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 relative overflow-hidden">
        {/* Desktop: split layout */}
        <div className="hidden lg:flex h-full">
          <div className="flex-1 relative">
            <ChinaMap
              selectedCity={selectedCity}
              onCitySelect={handleCitySelect}
              onRestaurantSelect={handleRestaurantSelect}
              className="h-full"
            />
            {!selectedCity && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="bg-background/90 backdrop-blur-sm rounded-xl p-6 text-center max-w-xs pointer-events-auto border border-border">
                  <h2 className="text-base font-semibold text-foreground">
                    Select a city
                  </h2>
                  <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                    Discover what to eat, where to go, and what to order.
                  </p>
                  <div className="mt-4 flex flex-wrap justify-center gap-1.5">
                    {cities.map((city) => (
                      <button
                        key={city.id}
                        onClick={() => handleCitySelect(city)}
                        className="rounded-full border border-border px-3 py-1 text-xs font-medium text-foreground hover:bg-accent transition-colors"
                      >
                        {city.name_en}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {selectedCity && (
            <div className="w-[480px] xl:w-[520px] border-l border-border bg-background overflow-y-auto">
              <div className="p-6">
                <CityPanel city={selectedCity} />
              </div>
            </div>
          )}
        </div>

        {/* Mobile: stacked layout */}
        <div className="lg:hidden h-full flex flex-col">
          <div className="flex-1 relative">
            <ChinaMap
              selectedCity={selectedCity}
              onCitySelect={handleCitySelect}
              onRestaurantSelect={handleRestaurantSelect}
              className="h-full"
            />

            {!selectedCity && !showPanel && (
              <div className="absolute bottom-6 left-4 right-4">
                <div className="bg-background/95 backdrop-blur-sm rounded-xl p-4 text-center border border-border">
                  <p className="text-sm font-medium text-foreground">
                    Where are you eating?
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Tap a city to start
                  </p>
                  <div className="mt-3 flex flex-wrap justify-center gap-1.5">
                    {cities.map((city) => (
                      <button
                        key={city.id}
                        onClick={() => handleCitySelect(city)}
                        className="rounded-full border border-border px-3 py-1 text-xs font-medium text-foreground hover:bg-accent transition-colors"
                      >
                        {city.name_en}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {selectedCity && showPanel && (
            <div
              className={cn(
                "absolute inset-x-0 bottom-0 z-10 bg-background rounded-t-xl border-t border-border",
                "max-h-[75vh] overflow-y-auto",
                "animate-in slide-in-from-bottom duration-300"
              )}
            >
              <div className="sticky top-0 z-10 bg-background rounded-t-xl border-b border-border">
                <div className="flex items-center justify-center py-2">
                  <div className="h-1 w-8 rounded-full bg-border" />
                </div>
                <div className="flex items-center justify-between px-4 pb-3">
                  <div className="flex items-baseline gap-2">
                    <h2 className="font-semibold text-foreground text-sm">
                      {selectedCity.name_en}
                    </h2>
                    <span className="text-xs text-muted-foreground">{selectedCity.name_zh}</span>
                  </div>
                  <button
                    onClick={() => {
                      setShowPanel(false);
                      setSelectedCity(null);
                    }}
                    className="rounded-full p-1.5 hover:bg-accent transition-colors"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <CityPanel city={selectedCity} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
