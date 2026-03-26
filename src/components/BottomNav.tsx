"use client";

import { Heart, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface BottomNavProps {
  activeTab: "home" | "map";
  onTabChange: (tab: "home" | "map") => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-30 bg-background border-t border-border lg:hidden">
      <div className="flex">
        <button
          onClick={() => onTabChange("home")}
          className={cn(
            "flex-1 flex flex-col items-center gap-0.5 py-2.5 touch-manipulation transition-colors",
            activeTab === "home"
              ? "text-foreground"
              : "text-muted-foreground/50"
          )}
        >
          <Heart
            className={cn("h-5 w-5", activeTab === "home" && "fill-current")}
          />
          <span className="text-[10px] font-medium">Home</span>
        </button>
        <button
          onClick={() => onTabChange("map")}
          className={cn(
            "flex-1 flex flex-col items-center gap-0.5 py-2.5 touch-manipulation transition-colors",
            activeTab === "map"
              ? "text-foreground"
              : "text-muted-foreground/50"
          )}
        >
          <MapPin
            className={cn("h-5 w-5", activeTab === "map" && "fill-current")}
          />
          <span className="text-[10px] font-medium">Map</span>
        </button>
      </div>
      {/* Safe area padding for phones with home indicator */}
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  );
}
