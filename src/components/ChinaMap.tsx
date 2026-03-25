"use client";

import { useEffect, useRef, useState } from "react";
import { cities } from "@/data/cities";
import { restaurants } from "@/data/restaurants";
import { City, Restaurant } from "@/types";
import type L from "leaflet";

interface ChinaMapProps {
  selectedCity?: City | null;
  onCitySelect: (city: City) => void;
  onRestaurantSelect?: (restaurant: Restaurant) => void;
  className?: string;
}

function LoadingMap({ className }: { className?: string }) {
  return (
    <div
      className={`bg-gradient-to-b from-blue-50 to-emerald-50 flex items-center justify-center ${className}`}
    >
      <div className="text-center">
        <div className="animate-pulse text-4xl mb-3">🗺️</div>
        <p className="text-sm text-muted-foreground">Loading map...</p>
      </div>
    </div>
  );
}

export function ChinaMap({
  selectedCity,
  onCitySelect,
  onRestaurantSelect,
  className,
}: ChinaMapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const markersRef = useRef<L.Marker[]>([]);
  const leafletRef = useRef<typeof L | null>(null);

  // Initialize map
  useEffect(() => {
    let cancelled = false;

    async function init() {
      const leaflet = await import("leaflet");
      await import("leaflet/dist/leaflet.css");

      if (cancelled || !containerRef.current || mapRef.current) return;

      leafletRef.current = leaflet.default;

      // Fix icon
      delete (leaflet.default.Icon.Default.prototype as unknown as Record<string, unknown>)["_getIconUrl"];
      leaflet.default.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
        iconUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
      });

      const map = leaflet.default.map(containerRef.current, {
        center: { lat: 33.5, lng: 108.0 },
        zoom: 5,
        zoomControl: false,
      });

      leaflet.default
        .tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        })
        .addTo(map);

      leaflet.default.control.zoom({ position: "bottomright" }).addTo(map);

      mapRef.current = map;
      setReady(true);
    }

    init();

    return () => {
      cancelled = true;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Update markers when city selection changes
  useEffect(() => {
    const map = mapRef.current;
    const leaflet = leafletRef.current;
    if (!map || !leaflet || !ready) return;

    // Clear old markers
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    const newMarkers: L.Marker[] = [];

    // City markers
    cities.forEach((city) => {
      const isSelected = selectedCity?.id === city.id;

      const icon = leaflet.divIcon({
        className: "city-marker",
        html: `<div style="
          width: ${isSelected ? 40 : 32}px;
          height: ${isSelected ? 40 : 32}px;
          background: ${isSelected ? "#dc2626" : "#f59e0b"};
          border: 3px solid #fff;
          border-radius: 50%;
          box-shadow: 0 2px ${isSelected ? 12 : 8}px rgba(${isSelected ? "220,38,38" : "0,0,0"},${isSelected ? 0.4 : 0.3});
          display: flex; align-items: center; justify-content: center;
          font-size: ${isSelected ? 18 : 14}px;
          cursor: pointer;
          transition: all 0.2s;
        ">🍜</div>`,
        iconSize: [isSelected ? 40 : 32, isSelected ? 40 : 32],
        iconAnchor: [isSelected ? 20 : 16, isSelected ? 20 : 16],
      });

      const marker = leaflet
        .marker({ lat: city.map_center[0], lng: city.map_center[1] }, { icon })
        .addTo(map)
        .bindPopup(
          `<div style="text-align:center;padding:4px;">
            <div style="font-weight:700;font-size:14px;">${city.name_en}</div>
            <div style="color:#666;font-size:13px;">${city.name_zh}</div>
          </div>`
        )
        .on("click", () => onCitySelect(city));

      newMarkers.push(marker);
    });

    // Restaurant markers when city is selected
    if (selectedCity) {
      const cityRestaurants = restaurants.filter(
        (r) => r.city_id === selectedCity.id
      );

      cityRestaurants.forEach((restaurant) => {
        const icon = leaflet.divIcon({
          className: "restaurant-marker",
          html: `<div style="
            width: 28px; height: 28px;
            background: #dc2626;
            border: 2px solid #fff;
            border-radius: 50%;
            box-shadow: 0 1px 4px rgba(0,0,0,0.3);
            display: flex; align-items: center; justify-content: center;
            font-size: 12px;
            cursor: pointer;
          ">🍽️</div>`,
          iconSize: [28, 28],
          iconAnchor: [14, 14],
        });

        const marker = leaflet
          .marker([restaurant.lat, restaurant.lng], { icon })
          .addTo(map)
          .bindPopup(
            `<div style="padding:4px;">
              <div style="font-weight:700;font-size:13px;">${restaurant.name_en}</div>
              <div style="color:#666;font-size:12px;">${restaurant.name_zh}</div>
              <div style="color:#999;font-size:11px;margin-top:2px;">${restaurant.cuisine_type} · ${restaurant.price_band}</div>
            </div>`
          )
          .on("click", () => onRestaurantSelect?.(restaurant));

        newMarkers.push(marker);
      });
    }

    markersRef.current = newMarkers;
  }, [selectedCity, ready, onCitySelect, onRestaurantSelect]);

  // Fly to city when selection changes
  const prevCityRef = useRef<string | null>(null);
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !ready) return;

    const currentId = selectedCity?.id ?? null;
    if (currentId === prevCityRef.current) return;
    prevCityRef.current = currentId;

    try {
      if (selectedCity) {
        map.flyTo(
          { lat: selectedCity.map_center[0], lng: selectedCity.map_center[1] },
          selectedCity.zoom,
          { duration: 1.2 }
        );
      } else {
        map.setView({ lat: 33.5, lng: 108.0 }, 5);
      }
    } catch {
      // Map may have been removed during strict mode
    }
  }, [selectedCity, ready]);

  return (
    <div className={className} style={{ position: "relative" }}>
      <div ref={containerRef} style={{ height: "100%", width: "100%" }} />
      {!ready && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(to bottom, #eff6ff, #ecfdf5)",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>🗺️</div>
            <p style={{ fontSize: 14, color: "#666" }}>Loading map...</p>
          </div>
        </div>
      )}
    </div>
  );
}
