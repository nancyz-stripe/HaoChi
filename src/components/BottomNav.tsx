"use client";

import { Heart, MapPin } from "lucide-react";

interface BottomNavProps {
  activeTab: "home" | "map";
  onTabChange: (tab: "home" | "map") => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-[1001] bg-white border-t border-[#D8DCE0] lg:hidden">
      <div className="flex px-6 py-3">
        <button
          onClick={() => onTabChange("home")}
          className="flex-1 flex flex-col items-center gap-0.5 touch-manipulation transition-colors"
        >
          <Heart
            className="h-6 w-6"
            style={{
              color: activeTab === "home" ? "#1A2C44" : "#717375",
              fill: activeTab === "home" ? "#1A2C44" : "none",
            }}
          />
          <span
            className="text-[12px]"
            style={{
              color: activeTab === "home" ? "#1A2C44" : "#717375",
              fontWeight: activeTab === "home" ? 500 : 400,
            }}
          >
            Home
          </span>
        </button>
        <button
          onClick={() => onTabChange("map")}
          className="flex-1 flex flex-col items-center gap-0.5 touch-manipulation transition-colors"
        >
          <MapPin
            className="h-6 w-6"
            style={{
              color: activeTab === "map" ? "#0A0A0A" : "#717375",
              fill: activeTab === "map" ? "#0A0A0A" : "none",
            }}
          />
          <span
            className="text-[12px]"
            style={{
              color: activeTab === "map" ? "#0A0A0A" : "#717375",
              fontWeight: activeTab === "map" ? 500 : 400,
            }}
          >
            Map
          </span>
        </button>
      </div>
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  );
}
