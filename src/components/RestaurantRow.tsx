"use client";

import { Restaurant } from "@/types";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import { cities } from "@/data/cities";

interface RestaurantRowProps {
  restaurant: Restaurant;
}

export function RestaurantRow({ restaurant }: RestaurantRowProps) {
  const city = cities.find((c) => c.id === restaurant.city_id);

  return (
    <Link
      href={`/city/${city?.slug}/restaurant/${restaurant.id}`}
      className="block rounded-[12px] border border-[#E4E9EC] p-[14px] touch-manipulation active:bg-[#F7F7F7] transition-colors"
    >
      <div className="flex items-start justify-between gap-[6px]">
        <div className="min-w-0 flex-1">
          <p className="text-[16px] font-medium leading-[22px] text-[#0A0A0A]">
            {restaurant.name_en}
          </p>
          <p className="mt-1 text-[14px] font-normal leading-[18px] text-[#717375] line-clamp-1">
            {restaurant.short_description}
          </p>
        </div>
        {restaurant.featured && (
          <span className="shrink-0 inline-flex items-center gap-1 rounded-[4px] bg-[#FFFAF4] px-2 py-1 text-[9px] font-medium text-[#B36F0E]">
            <Sparkles className="h-3 w-3" />
            LOCAL GEM
          </span>
        )}
      </div>
    </Link>
  );
}
