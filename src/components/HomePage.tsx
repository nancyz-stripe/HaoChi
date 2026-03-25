"use client";

import { useState } from "react";
import { City, Restaurant } from "@/types";
import { ChinaMap } from "./ChinaMap";
import { CitySelector } from "./CitySelector";
import { CityPanel } from "./CityPanel";
import { cities } from "@/data/cities";
import { ChevronDown, MapPin, Utensils, X } from "lucide-react";
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
      <header className="flex-shrink-0 border-b border-border bg-card/80 backdrop-blur-sm z-20">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🥢</span>
              <div>
                <h1 className="text-lg font-bold tracking-tight text-foreground">
                  China First Bite
                </h1>
                <p className="text-xs text-muted-foreground hidden sm:block">
                  Your local food guide for first-time travelers
                </p>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <CitySelector selectedCity={selectedCity} onSelect={handleCitySelect} />
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 relative overflow-hidden">
        {/* Desktop: split layout */}
        <div className="hidden lg:flex h-full">
          {/* Map side */}
          <div className="flex-1 relative">
            <ChinaMap
              selectedCity={selectedCity}
              onCitySelect={handleCitySelect}
              onRestaurantSelect={handleRestaurantSelect}
              className="h-full"
            />
            {!selectedCity && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="bg-card/90 backdrop-blur-sm rounded-2xl p-8 text-center shadow-lg max-w-sm pointer-events-auto">
                  <div className="text-5xl mb-4">🗺️</div>
                  <h2 className="text-xl font-bold text-foreground">
                    Explore China&apos;s Best Local Food
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Select a city to discover iconic dishes, trusted restaurants, and exactly what to order.
                  </p>
                  <div className="mt-4 flex flex-wrap justify-center gap-2">
                    {cities.map((city) => (
                      <button
                        key={city.id}
                        onClick={() => handleCitySelect(city)}
                        className="flex items-center gap-1.5 rounded-full bg-amber-50 border border-amber-200 px-3 py-1.5 text-sm font-medium text-amber-800 hover:bg-amber-100 transition-colors"
                      >
                        <MapPin className="h-3 w-3" />
                        {city.name_en}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Content panel */}
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
          {/* Map */}
          <div className="flex-1 relative">
            <ChinaMap
              selectedCity={selectedCity}
              onCitySelect={handleCitySelect}
              onRestaurantSelect={handleRestaurantSelect}
              className="h-full"
            />

            {!selectedCity && !showPanel && (
              <div className="absolute bottom-6 left-4 right-4">
                <div className="bg-card/95 backdrop-blur-sm rounded-2xl p-5 text-center shadow-xl">
                  <h2 className="text-lg font-bold text-foreground">
                    Where are you eating?
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Tap a city to discover its best local food
                  </p>
                  <div className="mt-3 flex flex-wrap justify-center gap-2">
                    {cities.map((city) => (
                      <button
                        key={city.id}
                        onClick={() => handleCitySelect(city)}
                        className="flex items-center gap-1 rounded-full bg-amber-50 border border-amber-200 px-3 py-1.5 text-sm font-medium text-amber-800 hover:bg-amber-100 transition-colors"
                      >
                        {city.name_en}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Mobile bottom sheet */}
          {selectedCity && showPanel && (
            <div
              className={cn(
                "absolute inset-x-0 bottom-0 z-10 bg-background rounded-t-2xl shadow-2xl",
                "max-h-[75vh] overflow-y-auto",
                "animate-in slide-in-from-bottom duration-300"
              )}
            >
              {/* Sheet handle */}
              <div className="sticky top-0 z-10 bg-background rounded-t-2xl border-b border-border">
                <div className="flex items-center justify-center py-2">
                  <div className="h-1.5 w-12 rounded-full bg-border" />
                </div>
                <div className="flex items-center justify-between px-4 pb-3">
                  <div className="flex items-center gap-2">
                    <Utensils className="h-4 w-4 text-amber-500" />
                    <h2 className="font-semibold text-foreground">
                      {selectedCity.name_en}
                    </h2>
                    <span className="text-muted-foreground">{selectedCity.name_zh}</span>
                  </div>
                  <button
                    onClick={() => {
                      setShowPanel(false);
                      setSelectedCity(null);
                    }}
                    className="rounded-full p-1.5 hover:bg-accent transition-colors"
                  >
                    <X className="h-4 w-4" />
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
