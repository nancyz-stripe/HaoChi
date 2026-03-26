"use client";

import { City, Restaurant } from "@/types";
import { ChinaMap } from "@/components/ChinaMap";
import { CityPanel } from "@/components/CityPanel";
import { CitySelector } from "@/components/CitySelector";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function CityPageClient({ city }: { city: City }) {
  const router = useRouter();

  const handleCitySelect = (c: City) => {
    router.push(`/city/${c.slug}`);
  };

  const handleRestaurantSelect = (restaurant: Restaurant) => {
    router.push(`/city/${city.slug}/restaurant/${restaurant.id}`);
  };

  return (
    <div className="flex h-[100dvh] flex-col">
      <header className="flex-shrink-0 border-b border-border bg-background/80 backdrop-blur-sm z-20">
        <div className="px-4 py-3">
          <Link href="/" className="text-base font-semibold tracking-tight text-foreground">
            China First Bite
          </Link>
          <div className="mt-2.5">
            <CitySelector selectedCity={city} onSelect={handleCitySelect} />
          </div>
        </div>
      </header>

      {/* Desktop */}
      <div className="flex-1 overflow-hidden hidden lg:flex">
        <div className="flex-1">
          <ChinaMap
            selectedCity={city}
            onCitySelect={handleCitySelect}
            onRestaurantSelect={handleRestaurantSelect}
            className="h-full"
          />
        </div>
        <div className="w-[480px] xl:w-[520px] border-l border-border bg-background overflow-y-auto">
          <div className="p-6">
            <CityPanel city={city} />
          </div>
        </div>
      </div>

      {/* Mobile: smaller map, scrollable content */}
      <div className="flex-1 overflow-y-auto lg:hidden">
        <div className="h-[28vh] min-h-[160px]">
          <ChinaMap
            selectedCity={city}
            onCitySelect={handleCitySelect}
            onRestaurantSelect={handleRestaurantSelect}
            className="h-full"
          />
        </div>
        <div className="px-4 pt-4 pb-6">
          <CityPanel city={city} />
        </div>
      </div>
    </div>
  );
}
