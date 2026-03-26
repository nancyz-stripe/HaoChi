"use client";

import { Heart } from "lucide-react";

interface BottomNavProps {
  activeTab?: "home" | "map";
  onTabChange: (tab: "home" | "map") => void;
}

function MapPinIcon({ active }: { active: boolean }) {
  const stroke = active ? "#1A2C44" : "#667691";
  const pinFill = active ? "#1A2C44" : "none";
  const circleFill = active ? "#F4F7FA" : "none";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        d="M20 10c0 4.993-7.942 10.751-7.942 10.751a.138.138 0 0 1-.116 0S4 14.993 4 10a8 8 0 0 1 16 0"
        fill={pinFill}
      />
      <circle cx="12" cy="10" r="3" fill={circleFill} />
    </svg>
  );
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-[1001] bg-white border-t-2 border-[#F7F7F7] lg:hidden">
      <div className="flex items-center justify-between px-4 py-3">
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
                fill: activeTab === "home" ? "#1A2C44" : "none",
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
            <MapPinIcon active={activeTab === "map"} />
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
