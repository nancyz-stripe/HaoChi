"use client";

import { City } from "@/types";
import { cities } from "@/data/cities";

const cityImages: Record<string, string> = {
  chongqing: "/images/chongqing.png",
  zhangjiajie: "/images/zhangjiajie.png",
  xian: "/images/xian.png",
  beijing: "/images/beijing.png",
};

interface CityGridProps {
  onSelect: (city: City) => void;
}

export function CityGrid({ onSelect }: CityGridProps) {
  return (
    <div className="grid grid-cols-2 gap-x-[17px] gap-y-[32px]">
      {cities
        .filter((city) => cityImages[city.slug])
        .map((city) => (
          <button
            key={city.id}
            onClick={() => onSelect(city)}
            className="group text-left touch-manipulation active:scale-[0.97] transition-transform"
          >
            <div className="aspect-[156/148] rounded-[5.725px] overflow-hidden bg-neutral-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={cityImages[city.slug]}
                alt={city.name_en}
                className="h-full w-full object-cover"
              />
            </div>
            <p className="mt-2 text-[16px] font-medium leading-[22px] text-[#0A0A0A] text-center">
              {city.name_en}{" "}
              <span className="text-[#1A2C44]">{city.name_zh}</span>
            </p>
          </button>
        ))}
    </div>
  );
}
