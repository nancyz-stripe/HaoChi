"use client";

import { useState } from "react";
import { City, Restaurant } from "@/types";
import { ChinaMap } from "./ChinaMap";
import { CityPanel } from "./CityPanel";
import { CitySelector } from "./CitySelector";
import { cities } from "@/data/cities";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
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
    <div className="flex h-[100dvh] flex-col bg-white">
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
            <div className="px-6 pt-[38px] pb-6">
              <p className="text-[12px] font-normal leading-[16px] text-[#5D5F61]">
                YOUR CHINA TRIP
              </p>
              <h1 className="mt-1 text-[32px] font-medium leading-[42px] text-[#0A0A0A]">
                Pick a city
              </h1>
            </div>
            <div className="px-6">
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
                    className="rounded-[24px] bg-white p-2 shadow-sm touch-manipulation active:scale-95"
                  >
                    <ArrowLeft className="h-4 w-4 text-[#0A0A0A]" />
                  </button>
                  <div className="flex-1 flex justify-center">
                    <div className="bg-[#F7F7F7] rounded-[43px] px-3 py-3 flex items-center gap-1.5 min-w-[202px] justify-center">
                      <span className="text-[14px] font-medium leading-[18px] text-[#0A0A0A]">
                        {selectedCity.name_en} {selectedCity.name_zh}
                      </span>
                      <ChevronDown className="h-[18px] w-[18px] text-[#717375]" />
                    </div>
                  </div>
                  <div className="w-8" />
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
                className="absolute inset-x-0 bottom-0 z-10 bg-white rounded-tl-[24px] rounded-tr-[24px]"
                style={{ maxHeight: "55vh", boxShadow: "0 -4px 20px rgba(0,0,0,0.08)" }}
              >
                <div className="flex items-center justify-center py-2">
                  <div className="h-1 w-10 rounded-[24px] bg-[#D8DCE0]" />
                </div>
                <div className="overflow-y-auto" style={{ maxHeight: "calc(55vh - 16px)" }}>
                  <div className="px-6 pb-24">
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
