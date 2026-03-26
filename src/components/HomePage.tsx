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

// Snap points as percentage of viewport height (sheet height)
const SNAP_COLLAPSED = 15;
const SNAP_HALF = 45;
const SNAP_FULL = 85;
const SNAPS = [SNAP_COLLAPSED, SNAP_HALF, SNAP_FULL];

function snapTo(height: number): number {
  let closest = SNAPS[0];
  let minDist = Infinity;
  for (const snap of SNAPS) {
    const dist = Math.abs(height - snap);
    if (dist < minDist) {
      minDist = dist;
      closest = snap;
    }
  }
  return closest;
}

function BottomSheet({ children, sheetHeight, setSheetHeight }: {
  children: React.ReactNode;
  sheetHeight: number;
  setSheetHeight: (h: number) => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const heightRef = useRef(sheetHeight);
  const [animating, setAnimating] = useState(false);
  const dragging = useRef(false);
  const startY = useRef(0);
  const startH = useRef(0);

  // Keep ref in sync for use in event handlers
  heightRef.current = sheetHeight;

  const isFullyExpanded = sheetHeight >= SNAP_FULL - 1;

  const beginDrag = useCallback((y: number) => {
    dragging.current = true;
    startY.current = y;
    startH.current = heightRef.current;
    setAnimating(false);
  }, []);

  const moveDrag = useCallback((y: number) => {
    if (!dragging.current) return;
    const delta = startY.current - y; // positive = swiping up
    const deltaVh = (delta / window.innerHeight) * 100;
    const next = Math.min(SNAP_FULL, Math.max(SNAP_COLLAPSED, startH.current + deltaVh));
    setSheetHeight(next);
  }, []);

  const endDrag = useCallback(() => {
    if (!dragging.current) return;
    dragging.current = false;
    setAnimating(true);
    setSheetHeight(snapTo(heightRef.current));
  }, []);

  // Global pointer listeners for handle dragging (mouse/trackpad)
  useEffect(() => {
    const onMove = (e: PointerEvent) => moveDrag(e.clientY);
    const onUp = () => endDrag();
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [moveDrag, endDrag]);

  // Touch listener on the whole sheet (handle + content)
  useEffect(() => {
    const sheet = contentRef.current?.parentElement;
    if (!sheet) return;

    let touchStartY = 0;
    let touchStartH = 0;
    let decided = false;
    let sheetDrag = false;

    const onStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
      touchStartH = heightRef.current;
      decided = false;
      sheetDrag = false;
    };

    const onMove = (e: TouchEvent) => {
      const y = e.touches[0].clientY;
      const delta = touchStartY - y; // positive = swiping up
      const isFull = touchStartH >= SNAP_FULL - 1;
      const scrollTop = contentRef.current?.scrollTop ?? 0;

      if (!decided) {
        // Need a minimum movement to decide
        if (Math.abs(delta) < 5) return;
        decided = true;

        if (delta > 0 && !isFull) {
          // Swiping up and not fully expanded → drag sheet up
          sheetDrag = true;
        } else if (delta < 0 && scrollTop <= 0) {
          // Swiping down and content at top → drag sheet down
          sheetDrag = true;
        }
        // Otherwise: let content scroll normally
      }

      if (sheetDrag) {
        e.preventDefault();
        const deltaVh = (delta / window.innerHeight) * 100;
        const next = Math.min(SNAP_FULL, Math.max(SNAP_COLLAPSED, touchStartH + deltaVh));
        setSheetHeight(next);
      }
    };

    const onEnd = () => {
      if (sheetDrag) {
        setAnimating(true);
        setSheetHeight(snapTo(heightRef.current));
        sheetDrag = false;
      }
      decided = false;
    };

    sheet.addEventListener("touchstart", onStart, { passive: true });
    sheet.addEventListener("touchmove", onMove, { passive: false });
    sheet.addEventListener("touchend", onEnd);

    return () => {
      sheet.removeEventListener("touchstart", onStart);
      sheet.removeEventListener("touchmove", onMove);
      sheet.removeEventListener("touchend", onEnd);
    };
  }, []);

  return (
    <div
      className="absolute inset-x-0 bottom-0 z-[1000] bg-white rounded-tl-[24px] rounded-tr-[24px] flex flex-col"
      style={{
        height: `${sheetHeight}vh`,
        maxHeight: "calc(100% - 60px)",
        boxShadow: "0 -4px 20px rgba(0,0,0,0.08)",
        transition: animating ? "height 0.3s ease-out" : "none",
      }}
    >
      {/* Drag handle */}
      <div
        className="flex items-center justify-center py-3 shrink-0 cursor-grab active:cursor-grabbing touch-none"
        onPointerDown={(e) => beginDrag(e.clientY)}
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
  const [sheetHeight, setSheetHeight] = useState(SNAP_HALF);
  const pickerRef = useRef<HTMLDivElement>(null);
  const pickerToggleRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Handle URL params on load (e.g. from "View in map" or browser back)
  const initializedFromUrl = useRef(false);
  useEffect(() => {
    const tab = searchParams.get("tab");
    const citySlug = searchParams.get("city");
    const restaurantId = searchParams.get("restaurant");

    if (tab === "map") {
      initializedFromUrl.current = true;
      setActiveTab("map");
      if (citySlug) {
        const city = cities.find((c) => c.slug === citySlug);
        if (city) setSelectedCity(city);
      }
      if (restaurantId) {
        setSelectedRestaurantId(restaurantId);
      }
    } else if (citySlug) {
      // Restore city detail page (e.g. browser back from restaurant)
      initializedFromUrl.current = true;
      const city = cities.find((c) => c.slug === citySlug);
      if (city) {
        setSelectedCity(city);
        setShowCityDetail(true);
        setActiveTab("home");
      }
    }
  }, [searchParams]);

  // Sync URL to browser history so back button works across navigations
  const prevState = useRef({ tab: activeTab, cityDetail: showCityDetail, city: selectedCity.slug });
  useEffect(() => {
    if (initializedFromUrl.current) {
      initializedFromUrl.current = false;
      prevState.current = { tab: activeTab, cityDetail: showCityDetail, city: selectedCity.slug };
      return;
    }

    const prev = prevState.current;
    const params = new URLSearchParams();

    if (activeTab === "map") {
      params.set("tab", "map");
      params.set("city", selectedCity.slug);
      if (selectedRestaurantId) params.set("restaurant", selectedRestaurantId);
      const url = `/?${params.toString()}`;
      if (prev.tab !== "map") {
        window.history.pushState(null, "", url);
      } else {
        window.history.replaceState(null, "", url);
      }
    } else if (activeTab === "home" && showCityDetail) {
      const url = `/?city=${selectedCity.slug}`;
      if (!prev.cityDetail) {
        // Entering city detail — push new history entry
        window.history.pushState(null, "", url);
      } else if (prev.city !== selectedCity.slug) {
        // Switching city within detail — replace
        window.history.replaceState(null, "", url);
      }
    } else if (activeTab === "home" && !showCityDetail) {
      if (prev.cityDetail || prev.tab === "map") {
        window.history.replaceState(null, "", "/");
      }
    }

    prevState.current = { tab: activeTab, cityDetail: showCityDetail, city: selectedCity.slug };
  }, [activeTab, showCityDetail, selectedCity.slug, selectedRestaurantId]);

  const handleCitySelect = (city: City) => {
    setSelectedCity(city);
    setShowCityPicker(false);
    setSelectedRestaurantId(null);
    if (activeTab !== "map") {
      setShowCityDetail(true);
      setActiveTab("home");
    }
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
                onRestaurantSelect={(restaurant) => {
                  setSelectedRestaurantId(restaurant.id);
                  if (sheetHeight < SNAP_HALF) setSheetHeight(SNAP_HALF);
                }}
                bottomSheetVh={sheetHeight}
                className="h-full"
              />
            </div>

            {/* Top bar */}
            <div className="absolute top-0 left-0 right-0 z-[1000] bg-white flex items-center justify-between px-4 py-3">
              <button
                onClick={() => router.back()}
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
            <BottomSheet sheetHeight={sheetHeight} setSheetHeight={setSheetHeight}>
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
