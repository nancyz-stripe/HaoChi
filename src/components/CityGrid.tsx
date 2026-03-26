"use client";

import { City } from "@/types";
import { cities } from "@/data/cities";
import Image from "next/image";

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
            <div className="aspect-[156/148] rounded-[5.725px] overflow-hidden relative bg-neutral-100">
              <Image
                src={cityImages[city.slug]}
                alt={city.name_en}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 200px"
              />
            </div>
            <p className="mt-2 text-[14px] font-medium leading-[18px] text-[#0A0A0A]">
              {city.name_en}{" "}
              <span className="text-[#717375]">{city.name_zh}</span>
            </p>
          </button>
        ))}
    </div>
  );
}
