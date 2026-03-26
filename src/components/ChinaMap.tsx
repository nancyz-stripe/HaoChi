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

function getRestaurantBounds(cityId: string, leaflet: typeof L) {
  const cityRestaurants = restaurants.filter((r) => r.city_id === cityId);
  if (cityRestaurants.length === 0) return null;

  const bounds = leaflet.latLngBounds(
    cityRestaurants.map((r) => [r.lat, r.lng] as [number, number])
  );
  return bounds;
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

  useEffect(() => {
    let cancelled = false;

    async function init() {
      const leaflet = await import("leaflet");
      await import("leaflet/dist/leaflet.css");

      if (cancelled || !containerRef.current || mapRef.current) return;

      leafletRef.current = leaflet.default;

      // Start with a default view; we'll fitBounds after if a city is selected
      const map = leaflet.default.map(containerRef.current, {
        center: { lat: 33.5, lng: 108.0 },
        zoom: 5,
        zoomControl: false,
        attributionControl: false,
      });

      leaflet.default
        .tileLayer(
          "https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png",
          { maxZoom: 19 }
        )
        .addTo(map);

      leaflet.default
        .tileLayer(
          "https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png",
          { maxZoom: 19, opacity: 0.4 }
        )
        .addTo(map);

      leaflet.default.control
        .zoom({ position: "bottomright" })
        .addTo(map);

      // If a city is already selected, fit to its restaurant bounds immediately
      if (selectedCity) {
        const bounds = getRestaurantBounds(selectedCity.id, leaflet.default);
        if (bounds) {
          // Padding: top for top bar (~60px), bottom for bottom sheet (~55% of viewport)
          map.fitBounds(bounds, {
            paddingTopLeft: [40, 80],
            paddingBottomRight: [40, 40],
            maxZoom: 15,
            animate: false,
          });
        }
      }

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

  // Update markers when city changes
  useEffect(() => {
    const map = mapRef.current;
    const leaflet = leafletRef.current;
    if (!map || !leaflet || !ready) return;

    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    const newMarkers: L.Marker[] = [];

    // Only show city dots when no city is selected (overview mode)
    if (!selectedCity) {
      cities.forEach((city) => {
        const size = 10;
        const icon = leaflet.divIcon({
          className: "",
          html: `<div style="
            width:${size}px;height:${size}px;
            background:#888;
            border:2px solid #fff;
            border-radius:50%;
            box-shadow:0 1px 3px rgba(0,0,0,0.2);
            cursor:pointer;
          "></div>`,
          iconSize: [size, size],
          iconAnchor: [size / 2, size / 2],
        });

        const marker = leaflet
          .marker(
            { lat: city.map_center[0], lng: city.map_center[1] },
            { icon }
          )
          .addTo(map)
          .bindPopup(
            `<div style="text-align:center;font-family:system-ui;padding:2px 0;">
              <div style="font-weight:600;font-size:13px;color:#1a1a1a;">${city.name_en}</div>
              <div style="font-size:12px;color:#999;margin-top:1px;">${city.name_zh}</div>
            </div>`,
            { closeButton: false, className: "minimal-popup" }
          )
          .on("click", () => onCitySelect(city));

        newMarkers.push(marker);
      });
    }

    // Show restaurant pins when a city is selected
    if (selectedCity) {
      const cityRestaurants = restaurants.filter(
        (r) => r.city_id === selectedCity.id
      );

      cityRestaurants.forEach((restaurant) => {
        const icon = leaflet.divIcon({
          className: "",
          html: `<div style="
            width:7px;height:7px;
            background:#0A0A0A;
            border-radius:50%;
            box-shadow:0 0 0 2px rgba(10,10,10,0.2);
            cursor:pointer;
          "></div>`,
          iconSize: [7, 7],
          iconAnchor: [3.5, 3.5],
        });

        const marker = leaflet
          .marker([restaurant.lat, restaurant.lng], { icon })
          .addTo(map)
          .bindPopup(
            `<div style="font-family:system-ui;padding:2px 0;">
              <div style="font-weight:600;font-size:12px;color:#1a1a1a;">${restaurant.name_en}</div>
              <div style="font-size:11px;color:#999;margin-top:1px;">${restaurant.name_zh}</div>
            </div>`,
            { closeButton: false, className: "minimal-popup" }
          )
          .on("click", () => onRestaurantSelect?.(restaurant));

        newMarkers.push(marker);
      });
    }

    markersRef.current = newMarkers;
  }, [selectedCity, ready, onCitySelect, onRestaurantSelect]);

  // Fly to restaurant bounds when city changes
  useEffect(() => {
    const map = mapRef.current;
    const leaflet = leafletRef.current;
    if (!map || !leaflet || !ready) return;

    try {
      if (selectedCity) {
        const bounds = getRestaurantBounds(selectedCity.id, leaflet);
        if (bounds) {
          map.fitBounds(bounds, {
            paddingTopLeft: [40, 80],
            paddingBottomRight: [40, 40],
            maxZoom: 15,
            animate: true,
          });
        }
      } else {
        map.setView({ lat: 33.5, lng: 108.0 }, 5);
      }
    } catch {
      // Map may have been removed during strict mode
    }
  }, [selectedCity, ready]);

  return (
    <div className={className} style={{ position: "relative" }}>
      <style>{`
        .minimal-popup .leaflet-popup-content-wrapper {
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          border: 1px solid #e5e5e5;
          padding: 0;
        }
        .minimal-popup .leaflet-popup-content {
          margin: 8px 12px;
        }
        .minimal-popup .leaflet-popup-tip {
          box-shadow: none;
          border: 1px solid #e5e5e5;
        }
        .leaflet-control-zoom a {
          color: #888 !important;
          border-color: #e5e5e5 !important;
        }
      `}</style>
      <div ref={containerRef} style={{ height: "100%", width: "100%" }} />
      {!ready && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-neutral-50"
        >
          <div className="h-5 w-5 rounded-full border-2 border-neutral-300 border-t-neutral-500 animate-spin" />
        </div>
      )}
    </div>
  );
}
