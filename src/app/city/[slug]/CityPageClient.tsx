"use client";

import { City, Restaurant } from "@/types";
import { ChinaMap } from "@/components/ChinaMap";
import { CityPanel } from "@/components/CityPanel";
import { CitySelector } from "@/components/CitySelector";
import { cities } from "@/data/cities";
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
      {/* Header */}
      <header className="flex-shrink-0 border-b border-border bg-card/80 backdrop-blur-sm z-20">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl">🥢</span>
              <h1 className="text-lg font-bold tracking-tight text-foreground">
                China First Bite
              </h1>
            </Link>
          </div>
          <div className="mt-3">
            <CitySelector selectedCity={city} onSelect={handleCitySelect} />
          </div>
        </div>
      </header>

      {/* Desktop: split layout */}
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

      {/* Mobile: scrollable */}
      <div className="flex-1 overflow-y-auto lg:hidden">
        <div className="h-[40vh]">
          <ChinaMap
            selectedCity={city}
            onCitySelect={handleCitySelect}
            onRestaurantSelect={handleRestaurantSelect}
            className="h-full"
          />
        </div>
        <div className="p-4">
          <CityPanel city={city} />
        </div>
      </div>
    </div>
  );
}
