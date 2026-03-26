"use client";

import { Heart, MapPin } from "lucide-react";

interface BottomNavProps {
  activeTab: "home" | "map";
  onTabChange: (tab: "home" | "map") => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-[1001] bg-white border-t-2 border-[#F7F7F7] lg:hidden">
      <div className="flex items-center justify-between px-4 py-6">
        {/* Home tab */}
        <button
          onClick={() => onTabChange("home")}
          className={`flex-1 flex items-center justify-center rounded-[43px] h-[63px] touch-manipulation transition-colors ${
            activeTab === "home" ? "bg-[#F4F7FA]" : "bg-white"
          }`}
        >
          <div className="flex flex-col items-center gap-1">
            <Heart
              className="h-6 w-6"
              style={{
                color: activeTab === "home" ? "#1A2C44" : "#667691",
                fill: "none",
                strokeWidth: 1.5,
              }}
            />
            <span
              className="text-[12px] leading-[16px]"
              style={{
                color: activeTab === "home" ? "#1A2C44" : "#667691",
                fontWeight: activeTab === "home" ? 500 : 400,
              }}
            >
              Home
            </span>
          </div>
        </button>

        {/* Map tab */}
        <button
          onClick={() => onTabChange("map")}
          className={`flex-1 flex items-center justify-center rounded-[43px] h-[63px] touch-manipulation transition-colors ${
            activeTab === "map" ? "bg-[#F4F7FA]" : "bg-white"
          }`}
        >
          <div className="flex flex-col items-center gap-1">
            <MapPin
              className="h-6 w-6"
              style={{
                color: activeTab === "map" ? "#1A2C44" : "#667691",
                fill: "none",
                strokeWidth: 1.5,
              }}
            />
            <span
              className="text-[12px] leading-[16px]"
              style={{
                color: activeTab === "map" ? "#1A2C44" : "#667691",
                fontWeight: activeTab === "map" ? 500 : 400,
              }}
            >
              Map
            </span>
          </div>
        </button>
      </div>
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  );
}
