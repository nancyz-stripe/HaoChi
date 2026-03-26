"use client";

import { useState } from "react";
import { City, Restaurant } from "@/types";
import { ChinaMap } from "./ChinaMap";
import { CityPanel } from "./CityPanel";
import { CitySelector } from "./CitySelector";
import { cities } from "@/data/cities";
import { Heart, MapPin, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { BottomNav } from "./BottomNav";
import { CityGrid } from "./CityGrid";

export function HomePage() {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [showPanel, setShowPanel] = useState(false);
  const [activeTab, setActiveTab] = useState<"home" | "map">("home");
  const router = useRouter();

  const handleCitySelect = (city: City) => {
    setSelectedCity(city);
    setActiveTab("map");
    setShowPanel(true);
  };

  const handleRestaurantSelect = (restaurant: Restaurant) => {
    const city = cities.find((c) => c.id === restaurant.city_id);
    if (city) {
      router.push(`/city/${city.slug}/restaurant/${restaurant.id}`);
    }
  };

  return (
    <div className="flex h-[100dvh] flex-col bg-background">
      {/* ===== DESKTOP ===== */}
      <div className="hidden lg:flex flex-col h-full">
        <header className="flex-shrink-0 border-b border-border bg-background/80 backdrop-blur-sm z-20">
          <div className="px-6 py-3">
            <div className="flex items-center gap-3">
              <h1 className="text-base font-semibold tracking-tight text-foreground">
                China First Bite
              </h1>
              <span className="text-xs text-muted-foreground">
                Local food guide for travelers
              </span>
            </div>
            <div className="mt-2.5">
              <CitySelector selectedCity={selectedCity} onSelect={handleCitySelect} />
            </div>
          </div>
        </header>
        <div className="flex-1 flex overflow-hidden">
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
      </div>

      {/* ===== MOBILE ===== */}
      <div className="lg:hidden flex flex-col h-full">
        {/* Home tab */}
        {activeTab === "home" && (
          <div className="flex-1 overflow-y-auto pb-20">
            <div className="px-5 pt-12 pb-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                Your China Trip
              </p>
              <h1 className="mt-1 text-[28px] font-bold text-foreground tracking-tight">
                Pick a city
              </h1>
            </div>
            <div className="px-5">
              <CityGrid onSelect={handleCitySelect} />
            </div>
          </div>
        )}

        {/* Map tab */}
        {activeTab === "map" && (
          <div className="flex-1 flex flex-col relative">
            {/* Top bar */}
            <div className="absolute top-0 left-0 right-0 z-20 flex items-center px-4 pt-3 pb-2">
              {selectedCity && (
                <>
                  <button
                    onClick={() => {
                      setSelectedCity(null);
                      setActiveTab("home");
                    }}
                    className="rounded-full bg-background/90 backdrop-blur-sm p-2 shadow-sm border border-border touch-manipulation active:scale-95"
                  >
                    <X className="h-4 w-4 text-foreground" />
                  </button>
                  <div className="flex-1 flex justify-center">
                    <div className="bg-background/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm border border-border flex items-center gap-2">
                      <span className="text-sm font-semibold text-foreground">
                        {selectedCity.name_en}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {selectedCity.name_zh}
                      </span>
                    </div>
                  </div>
                  <div className="w-8" /> {/* spacer for centering */}
                </>
              )}
            </div>

            {/* Map */}
            <div className="flex-1">
              <ChinaMap
                selectedCity={selectedCity}
                onCitySelect={handleCitySelect}
                onRestaurantSelect={handleRestaurantSelect}
                className="h-full"
              />
            </div>

            {/* Bottom sheet */}
            {selectedCity && showPanel && (
              <div
                className="absolute inset-x-0 bottom-0 z-10 bg-background rounded-t-2xl"
                style={{ maxHeight: "55vh", boxShadow: "0 -4px 20px rgba(0,0,0,0.08)" }}
              >
                <div className="flex items-center justify-center pt-2.5 pb-1">
                  <div className="h-1 w-9 rounded-full bg-neutral-300" />
                </div>
                <div className="overflow-y-auto" style={{ maxHeight: "calc(55vh - 16px)" }}>
                  <div className="px-5 pb-24">
                    <CityPanel city={selectedCity} variant="sheet" />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Bottom nav */}
        <BottomNav
          activeTab={activeTab}
          onTabChange={(tab) => {
            setActiveTab(tab);
            if (tab === "home") {
              setSelectedCity(null);
              setShowPanel(false);
            }
          }}
        />
      </div>
    </div>
  );
}
