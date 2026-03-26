"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { City, Restaurant } from "@/types";
import { ChinaMap } from "./ChinaMap";
import { CityPanel } from "./CityPanel";
import { CitySelector } from "./CitySelector";
import { cities } from "@/data/cities";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { BottomNav } from "./BottomNav";
import { CityGrid } from "./CityGrid";
import { CityDetailPage } from "./CityDetailPage";

const mapCities = cities.filter((c) => c.slug !== "furong");

// Snap points as percentage of viewport height from the bottom
const SNAP_COLLAPSED = 80; // just handle + title visible
const SNAP_HALF = 45; // ~45% of screen
const SNAP_FULL = 85; // nearly full screen

function BottomSheet({ children }: { children: React.ReactNode }) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [sheetHeight, setSheetHeight] = useState(SNAP_HALF);
  const dragState = useRef<{ startY: number; startHeight: number; source: "handle" | "content" } | null>(null);
  const isFullyExpanded = sheetHeight >= SNAP_FULL - 1;

  const handleDragStart = useCallback((clientY: number, source: "handle" | "content") => {
    dragState.current = { startY: clientY, startHeight: sheetHeight, source };
  }, [sheetHeight]);

  const handleDragMove = useCallback((clientY: number) => {
    if (!dragState.current) return;
    const deltaY = dragState.current.startY - clientY;
    const deltaPercent = (deltaY / window.innerHeight) * 100;
    const newHeight = Math.min(SNAP_FULL, Math.max(10, dragState.current.startHeight + deltaPercent));
    setSheetHeight(newHeight);
  }, []);

  const handleDragEnd = useCallback(() => {
    if (!dragState.current) return;
    const snaps = [SNAP_COLLAPSED, SNAP_HALF, SNAP_FULL];
    let closest = snaps[0];
    let minDist = Math.abs(sheetHeight - snaps[0]);
    for (const snap of snaps) {
      const dist = Math.abs(sheetHeight - snap);
      if (dist < minDist) {
        minDist = dist;
        closest = snap;
      }
    }
    setSheetHeight(closest);
    dragState.current = null;
  }, [sheetHeight]);

  useEffect(() => {
    const onPointerMove = (e: PointerEvent) => handleDragMove(e.clientY);
    const onPointerUp = () => handleDragEnd();

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, [handleDragMove, handleDragEnd]);

  // Touch handling on the content area: expand sheet first, then scroll
  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    let touchStartY = 0;
    let startHeight = 0;
    let isDraggingSheet = false;

    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
      startHeight = sheetHeight;
      isDraggingSheet = false;
    };

    const onTouchMove = (e: TouchEvent) => {
      const currentY = e.touches[0].clientY;
      const deltaY = touchStartY - currentY;
      const scrollTop = content.scrollTop;
      const isAtTop = scrollTop <= 0;
      const isSwipingUp = deltaY > 0;
      const isSwipingDown = deltaY < 0;
      const currentlyFull = startHeight >= SNAP_FULL - 1;

      // Swiping up and sheet not fully expanded → expand sheet
      if (isSwipingUp && !currentlyFull && !isDraggingSheet) {
        isDraggingSheet = true;
      }

      // Swiping down and content is at the top → collapse sheet
      if (isSwipingDown && isAtTop && !isDraggingSheet) {
        isDraggingSheet = true;
      }

      if (isDraggingSheet) {
        e.preventDefault();
        const deltaPercent = (deltaY / window.innerHeight) * 100;
        const newHeight = Math.min(SNAP_FULL, Math.max(10, startHeight + deltaPercent));
        setSheetHeight(newHeight);
      }
    };

    const onTouchEnd = () => {
      if (isDraggingSheet) {
        // Snap
        const snaps = [SNAP_COLLAPSED, SNAP_HALF, SNAP_FULL];
        let closest = snaps[0];
        let minDist = Infinity;
        for (const snap of snaps) {
          const dist = Math.abs(sheetHeight - snap);
          if (dist < minDist) {
            minDist = dist;
            closest = snap;
          }
        }
        setSheetHeight(closest);
        isDraggingSheet = false;
      }
    };

    content.addEventListener("touchstart", onTouchStart, { passive: true });
    content.addEventListener("touchmove", onTouchMove, { passive: false });
    content.addEventListener("touchend", onTouchEnd);

    return () => {
      content.removeEventListener("touchstart", onTouchStart);
      content.removeEventListener("touchmove", onTouchMove);
      content.removeEventListener("touchend", onTouchEnd);
    };
  }, [sheetHeight]);

  return (
    <div
      ref={sheetRef}
      className="absolute inset-x-0 bottom-0 z-[1000] bg-white rounded-tl-[24px] rounded-tr-[24px] flex flex-col"
      style={{
        height: `${sheetHeight}vh`,
        maxHeight: "calc(100% - 60px)",
        boxShadow: "0 -4px 20px rgba(0,0,0,0.08)",
        transition: dragState.current ? "none" : "height 0.3s ease-out",
      }}
    >
      {/* Drag handle */}
      <div
        className="flex items-center justify-center py-3 shrink-0 cursor-grab active:cursor-grabbing touch-none"
        onPointerDown={(e) => handleDragStart(e.clientY, "handle")}
        onTouchStart={(e) => {
          handleDragStart(e.touches[0].clientY, "handle");
        }}
        onTouchMove={(e) => {
          e.preventDefault();
          handleDragMove(e.touches[0].clientY);
        }}
        onTouchEnd={() => handleDragEnd()}
      >
        <div className="h-1 w-10 rounded-[24px] bg-[#D8DCE0]" />
      </div>
      {/* Content — scrollable only when fully expanded */}
      <div
        ref={contentRef}
        className={`flex-1 pb-24 ${isFullyExpanded ? "overflow-y-auto" : "overflow-hidden"}`}
      >
        {children}
      </div>
    </div>
  );
}

export function HomePage() {
  const defaultCity = cities.find((c) => c.slug === "chongqing") || cities[0];
  const [selectedCity, setSelectedCity] = useState<City>(defaultCity);
  const [showCityDetail, setShowCityDetail] = useState(false);
  const [activeTab, setActiveTab] = useState<"home" | "map">("home");
  const [showCityPicker, setShowCityPicker] = useState(false);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<string | null>(null);
  const pickerRef = useRef<HTMLDivElement>(null);
  const pickerToggleRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Handle URL params (e.g. from "View in map" on restaurant page)
  useEffect(() => {
    const tab = searchParams.get("tab");
    const citySlug = searchParams.get("city");
    const restaurantId = searchParams.get("restaurant");

    if (tab === "map") {
      setActiveTab("map");
      if (citySlug) {
        const city = cities.find((c) => c.slug === citySlug);
        if (city) setSelectedCity(city);
      }
      if (restaurantId) {
        setSelectedRestaurantId(restaurantId);
      }
    }
  }, [searchParams]);

  const handleCitySelect = (city: City) => {
    setSelectedCity(city);
    setShowCityDetail(true);
    setActiveTab("home");
    setShowCityPicker(false);
    setSelectedRestaurantId(null);
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
      const target = e.target as Node;
      if (pickerRef.current && !pickerRef.current.contains(target) &&
          pickerToggleRef.current && !pickerToggleRef.current.contains(target)) {
        setShowCityPicker(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showCityPicker]);

  const cityPickerPopup = (
    <div
      ref={pickerRef}
      className="bg-white rounded-[24px] overflow-hidden"
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
  );

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
        {/* Home tab — city grid */}
        {activeTab === "home" && !showCityDetail && (
          <div className="flex-1 overflow-y-auto pb-20">
            <div className="px-6 pt-[38px] pb-6">
              <p className="text-[12px] font-normal leading-[16px] text-[#5D5F61]">
                CECILIA & GERARDO'S CHINA TRIP
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

        {/* City detail page (Home tab with city selected) */}
        {activeTab === "home" && showCityDetail && (
          <CityDetailPage
            city={selectedCity}
            onBack={() => setShowCityDetail(false)}
            onCitySwitch={handleCitySelect}
            showCityPicker={showCityPicker}
            onToggleCityPicker={() => setShowCityPicker(!showCityPicker)}
            cityPickerElement={cityPickerPopup}
            pickerToggleRef={pickerToggleRef}
          />
        )}

        {/* Map tab */}
        {activeTab === "map" && (
          <div className="flex-1 relative overflow-hidden">
            {/* Full-screen map background */}
            <div className="absolute inset-0">
              <ChinaMap
                selectedCity={selectedCity}
                selectedRestaurantId={selectedRestaurantId}
                onCitySelect={handleCitySelect}
                onRestaurantSelect={(restaurant) => setSelectedRestaurantId(restaurant.id)}
                className="h-full"
              />
            </div>

            {/* Top bar */}
            <div className="absolute top-0 left-0 right-0 z-[1000] bg-white flex items-center justify-between px-4 py-3">
              <button
                onClick={() => setActiveTab("home")}
                className="rounded-[24px] bg-white p-2 touch-manipulation active:scale-95"
              >
                <ArrowLeft className="h-4 w-4 text-[#0A0A0A]" />
              </button>
              <button
                ref={pickerToggleRef}
                onClick={() => setShowCityPicker(!showCityPicker)}
                className="bg-[#F7F7F7] rounded-[43px] px-3 py-3 flex items-center justify-between w-[202px] touch-manipulation"
              >
                <span className="text-[14px] font-medium leading-[18px] text-[#0A0A0A]">
                  {selectedCity.name_en} {selectedCity.name_zh}
                </span>
                <ChevronDown className="h-[18px] w-[18px] text-[#717375]" />
              </button>
            </div>

            {/* City picker popup on map */}
            {showCityPicker && (
              <div className="absolute right-4 top-[60px] z-[1001]">
                {cityPickerPopup}
              </div>
            )}

            {/* Interactive bottom sheet */}
            <BottomSheet>
              <div className="px-6">
                <CityPanel
                  city={selectedCity}
                  variant="sheet"
                  selectedRestaurantId={selectedRestaurantId}
                  onRestaurantSelect={(id) => setSelectedRestaurantId(id)}
                />
              </div>
            </BottomSheet>
          </div>
        )}

        {/* Bottom nav */}
        <BottomNav
          activeTab={activeTab}
          onTabChange={(tab) => {
            setActiveTab(tab);
            setShowCityPicker(false);
          }}
        />
      </div>
    </div>
  );
}
