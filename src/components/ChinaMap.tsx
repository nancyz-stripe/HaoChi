"use client";

import { useEffect, useRef, useState } from "react";
import { cities } from "@/data/cities";
import { restaurants } from "@/data/restaurants";
import { City, Restaurant } from "@/types";
import { isLikelyInChina, wgs84ToGcj02 } from "@/lib/geo";
import type L from "leaflet";

interface ChinaMapProps {
  selectedCity?: City | null;
  selectedRestaurantId?: string | null;
  onCitySelect: (city: City) => void;
  onRestaurantSelect?: (restaurant: Restaurant) => void;
  className?: string;
  /** Bottom sheet height as vh percentage, used to offset pin centering */
  bottomSheetVh?: number;
}

function getRestaurantBounds(
  cityId: string,
  leaflet: typeof L,
  useGcj02: boolean
) {
  const cityRestaurants = restaurants.filter((r) => r.city_id === cityId);
  if (cityRestaurants.length === 0) return null;

  const bounds = leaflet.latLngBounds(
    cityRestaurants.map((r) => {
      const [lat, lng] = useGcj02
        ? wgs84ToGcj02(r.lat, r.lng)
        : [r.lat, r.lng];
      return [lat, lng] as [number, number];
    })
  );
  return bounds;
}

function toCoord(
  lat: number,
  lng: number,
  useGcj02: boolean
): [number, number] {
  return useGcj02 ? wgs84ToGcj02(lat, lng) : [lat, lng];
}

export function ChinaMap({
  selectedCity,
  selectedRestaurantId,
  onCitySelect,
  onRestaurantSelect,
  className,
  bottomSheetVh = 0,
}: ChinaMapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const markersRef = useRef<L.Marker[]>([]);
  const leafletRef = useRef<typeof L | null>(null);
  const useGcj02Ref = useRef(false);

  useEffect(() => {
    let cancelled = false;

    async function init() {
      const leaflet = await import("leaflet");
      await import("leaflet/dist/leaflet.css");

      if (cancelled || !containerRef.current || mapRef.current) return;

      leafletRef.current = leaflet.default;

      // Detect region for tile provider selection
      const inChina = isLikelyInChina();
      useGcj02Ref.current = inChina;

      const map = leaflet.default.map(containerRef.current, {
        center: { lat: 33.5, lng: 108.0 },
        zoom: 5,
        zoomControl: false,
        attributionControl: false,
      });

      if (inChina) {
        // Amap (Gaode) tiles — works reliably in China, uses GCJ-02
        leaflet.default
          .tileLayer(
            "https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",
            {
              maxZoom: 18,
              subdomains: "1234",
              attribution: "&copy; AutoNavi",
            }
          )
          .addTo(map);
      } else {
        // CartoDB Positron tiles — clean, minimal style for international users
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
      }

      leaflet.default.control
        .zoom({ position: "bottomright" })
        .addTo(map);

      // If a city is already selected, fit to its restaurant bounds immediately
      if (selectedCity) {
        const bounds = getRestaurantBounds(
          selectedCity.id,
          leaflet.default,
          inChina
        );
        if (bounds) {
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

    const useGcj02 = useGcj02Ref.current;

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

        const [lat, lng] = toCoord(
          city.map_center[0],
          city.map_center[1],
          useGcj02
        );

        const marker = leaflet
          .marker({ lat, lng }, { icon })
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
        const isSelected = restaurant.id === selectedRestaurantId;
        const dotSize = isSelected ? 16 : 14;

        const icon = leaflet.divIcon({
          className: "",
          html: `<div style="
            width:${dotSize}px;height:${dotSize}px;
            background:#1A2C44;
            border-radius:50%;
            box-shadow:0 0 0 ${isSelected ? 3 : 2}px rgba(26,44,68,${isSelected ? 0.3 : 0.2});
            cursor:pointer;
            transition:all 0.2s;
          "></div>`,
          iconSize: [dotSize, dotSize],
          iconAnchor: [dotSize / 2, dotSize / 2],
        });

        const [lat, lng] = toCoord(restaurant.lat, restaurant.lng, useGcj02);

        const marker = leaflet
          .marker([lat, lng], { icon })
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
  }, [selectedCity, selectedRestaurantId, ready, onCitySelect, onRestaurantSelect]);

  // Fly to restaurant bounds when city changes
  useEffect(() => {
    const map = mapRef.current;
    const leaflet = leafletRef.current;
    if (!map || !leaflet || !ready) return;

    try {
      if (selectedCity) {
        const bounds = getRestaurantBounds(
          selectedCity.id,
          leaflet,
          useGcj02Ref.current
        );
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

  // Center on selected restaurant, offset for top nav and bottom sheet
  useEffect(() => {
    const map = mapRef.current;
    const leaflet = leafletRef.current;
    if (!map || !leaflet || !ready || !selectedRestaurantId) return;

    const restaurant = restaurants.find((r) => r.id === selectedRestaurantId);
    if (!restaurant) return;

    try {
      const [lat, lng] = toCoord(restaurant.lat, restaurant.lng, useGcj02Ref.current);
      const targetZoom = Math.max(map.getZoom(), 14);

      // Calculate the visible vertical center between top nav and bottom sheet
      const topNavPx = 56;
      const sheetPx = window.innerHeight * (bottomSheetVh / 100);
      const mapHeight = map.getSize().y;
      // Visible area: from topNavPx to (mapHeight - sheetPx)
      const visibleCenterY = (topNavPx + (mapHeight - sheetPx)) / 2;
      const mapCenterY = mapHeight / 2;
      // How many pixels we need to shift: positive means visible center is above map center
      const pixelOffset = mapCenterY - visibleCenterY;

      // Project pin to pixel, offset, unproject to get the adjusted center
      const pinPoint = map.project({ lat, lng }, targetZoom);
      const adjustedPoint = pinPoint.add([0, pixelOffset]);
      const adjustedLatLng = map.unproject(adjustedPoint, targetZoom);

      map.setView(adjustedLatLng, targetZoom, { animate: true });
    } catch {
      // Map may have been removed
    }
  }, [selectedRestaurantId, ready, bottomSheetVh]);

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
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-50">
          <div className="h-5 w-5 rounded-full border-2 border-neutral-300 border-t-neutral-500 animate-spin" />
        </div>
      )}
    </div>
  );
}
