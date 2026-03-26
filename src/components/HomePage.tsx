"use client";

import { useState, useRef, useEffect } from "react";
import { City, Restaurant } from "@/types";
import { ChinaMap } from "./ChinaMap";
import { CityPanel } from "./CityPanel";
import { CitySelector } from "./CitySelector";
import { cities } from "@/data/cities";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { BottomNav } from "./BottomNav";
import { CityGrid } from "./CityGrid";

const mapCities = cities.filter((c) => c.slug !== "furong");

export function HomePage() {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [showPanel, setShowPanel] = useState(false);
  const [activeTab, setActiveTab] = useState<"home" | "map">("home");
  const [showCityPicker, setShowCityPicker] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleCitySelect = (city: City) => {
    setSelectedCity(city);
    setActiveTab("map");
    setShowPanel(true);
    setShowCityPicker(false);
  };

  const handleRestaurantSelect = (restaurant: Restaurant) => {
    const city = cities.find((c) => c.id === restaurant.city_id);
    if (city) {
      router.push(`/city/${city.slug}/restaurant/${restaurant.id}`);
    }
  };

  // Close picker when tapping outside
  useEffect(() => {
    if (!showCityPicker) return;
    function handleClick(e: MouseEvent) {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        setShowCityPicker(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showCityPicker]);

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
          <div className="flex-1 relative overflow-hidden">
            {/* Full-screen map background */}
            <div className="absolute inset-0">
              <ChinaMap
                selectedCity={selectedCity}
                onCitySelect={handleCitySelect}
                onRestaurantSelect={handleRestaurantSelect}
                className="h-full"
              />
            </div>

            {/* Top bar */}
            <div className="absolute top-0 left-0 right-0 z-[1000] bg-white flex items-center justify-between px-4 py-3">
              <button
                onClick={() => {
                  setSelectedCity(null);
                  setShowCityPicker(false);
                  setActiveTab("home");
                }}
                className="rounded-[24px] bg-white p-2 touch-manipulation active:scale-95"
              >
                <ArrowLeft className="h-4 w-4 text-[#0A0A0A]" />
              </button>
              {selectedCity && (
                <button
                  onClick={() => setShowCityPicker(!showCityPicker)}
                  className="bg-[#F7F7F7] rounded-[43px] px-3 py-3 flex items-center justify-between w-[202px] touch-manipulation"
                >
                  <span className="text-[14px] font-medium leading-[18px] text-[#0A0A0A]">
                    {selectedCity.name_en} {selectedCity.name_zh}
                  </span>
                  <ChevronDown className="h-[18px] w-[18px] text-[#717375]" />
                </button>
              )}
            </div>

            {/* City picker popup */}
            {showCityPicker && (
              <div
                ref={pickerRef}
                className="absolute right-4 top-[60px] z-[1001] bg-white rounded-[24px] overflow-hidden"
                style={{ boxShadow: "0 4px 18px rgba(0,0,0,0.24)" }}
              >
                <div className="px-6 py-6">
                  <div className="flex flex-col gap-2">
                    {mapCities.map((city) => {
                      const isSelected = selectedCity?.id === city.id;
                      return (
                        <button
                          key={city.id}
                          onClick={() => handleCitySelect(city)}
                          className={`w-full rounded-[20px] px-4 py-3 text-[14px] font-normal leading-[18px] text-[#0A0A0A] touch-manipulation transition-colors ${
                            isSelected
                              ? "bg-[#F7F7F7] border-2 border-[#0A0A0A]"
                              : "bg-white border border-[#D8DCE0]"
                          }`}
                        >
                          {city.name_en} {city.name_zh}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Bottom sheet — scrollable, always shown */}
            {selectedCity && showPanel && (
              <div
                className="absolute inset-x-0 bottom-0 z-[1000] bg-white rounded-tl-[24px] rounded-tr-[24px] flex flex-col"
                style={{ maxHeight: "calc(100% - 120px)", boxShadow: "0 -4px 20px rgba(0,0,0,0.08)" }}
              >
                {/* Drag handle */}
                <div className="flex items-center justify-center py-2 shrink-0">
                  <div className="h-1 w-10 rounded-[24px] bg-[#D8DCE0]" />
                </div>
                {/* Scrollable content */}
                <div className="overflow-y-auto flex-1 pb-24">
                  <div className="px-6">
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
              setShowCityPicker(false);
            }
          }}
        />
      </div>
    </div>
  );
}
