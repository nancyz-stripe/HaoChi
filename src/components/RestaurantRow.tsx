"use client";

import { Restaurant } from "@/types";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import { cities } from "@/data/cities";

interface RestaurantRowProps {
  restaurant: Restaurant;
  selected?: boolean;
  onClick?: () => void;
}

export function RestaurantRow({ restaurant, selected, onClick }: RestaurantRowProps) {
  const city = cities.find((c) => c.id === restaurant.city_id);

  const borderClass = selected
    ? "border-2 border-[#0A0A0A]"
    : "border border-[#E4E9EC]";

  return (
    <Link
      href={`/city/${city?.slug}/restaurant/${restaurant.id}`}
      onClick={onClick}
      className={`block rounded-[12px] ${borderClass} p-[14px] touch-manipulation active:bg-[#F7F7F7] transition-colors`}
    >
      <div className="flex flex-col gap-[6px]">
        <div className="flex items-center justify-between">
          <p className="text-[16px] font-medium leading-[22px] text-[#0A0A0A]">
            {restaurant.name_en}{" "}
            <span className="text-[#0A0A0A]">{restaurant.name_zh}</span>
          </p>
          {restaurant.featured && (
            <span className="shrink-0 ml-2 inline-flex items-center gap-1 rounded-[4px] bg-[#F4F7FA] px-2 py-1 text-[9px] font-medium text-[#1A2C44]">
              <Sparkles className="h-3 w-3" />
              LOCAL GEM
            </span>
          )}
        </div>
        <p className="text-[16px] font-normal leading-[22px] text-[#1A2C44] line-clamp-2">
          {restaurant.short_description}
        </p>
      </div>
    </Link>
  );
}
