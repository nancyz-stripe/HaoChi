"use client";

import { City } from "@/types";
import { getFirstMealDishes, getRestaurantsByCity } from "@/data";
import { RestaurantRow } from "./RestaurantRow";
import { ArrowLeft, ChevronDown, X } from "lucide-react";
import { RefObject, useState } from "react";

const cityImages: Record<string, string> = {
  chongqing: "/images/chongqing.png",
  zhangjiajie: "/images/zhangjiajie.png",
  xian: "/images/xian.png",
  beijing: "/images/beijing.png",
};

// Top 3 featured dishes per city with images
const cityDishCards: Record<
  string,
  { label: string; image: string }[]
> = {
  chongqing: [
    { label: "Hotpot 火锅", image: "/images/dishes/cq-hotpot.png" },
    { label: "Noodles 重庆小面", image: "/images/dishes/cq-noodles.png" },
    { label: "Chili Chicken 辣子鸡", image: "/images/dishes/cq-chicken.png" },
  ],
  beijing: [
    { label: "Peking roast duck 北京烤鸭", image: "/images/dishes/bj-duck.png" },
    { label: "Dumplings 饺子", image: "/images/dishes/bj-dumplings.png" },
    { label: "Braised pork 红烧肉", image: "/images/dishes/bj-pork.png" },
  ],
  xian: [
    { label: "Chinese arepa 肉夹馍", image: "/images/dishes/xa-roujiamo.png" },
    { label: "Biangbiang noodles", image: "/images/dishes/xa-biangbiang.png" },
    { label: "Soup dumplings 灌汤包", image: "/images/dishes/xa-dumplings.png" },
  ],
  zhangjiajie: [
    { label: "Three-flavor wok 三下锅", image: "/images/dishes/zjj-sanxiaguo.png" },
    { label: "Smoked pork 湘西腊肉", image: "/images/dishes/zjj-larou.png" },
    { label: "Fried potatoes 土家炕洋芋", image: "/images/dishes/zjj-potatoes.png" },
  ],
};

interface CityDetailPageProps {
  city: City;
  onBack: () => void;
  onCitySwitch: (city: City) => void;
  showCityPicker: boolean;
  onToggleCityPicker: () => void;
  cityPickerElement: React.ReactNode;
  pickerToggleRef?: RefObject<HTMLButtonElement | null>;
}

export function CityDetailPage({
  city,
  onBack,
  onCitySwitch,
  showCityPicker,
  onToggleCityPicker,
  cityPickerElement,
  pickerToggleRef,
}: CityDetailPageProps) {
  const [showGallery, setShowGallery] = useState(false);
  const cityRestaurants = getRestaurantsByCity(city.id);
  const dishes = cityDishCards[city.slug] || [];
  const heroImage = cityImages[city.slug];

  return (
    <div className="flex-1 overflow-y-auto pb-20 bg-white">
      {/* Hero image */}
      <div className="relative h-[206px] w-full">
        {heroImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={heroImage}
            alt={city.name_en}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full bg-neutral-200" />
        )}

        {/* Back button */}
        <button
          onClick={onBack}
          className="absolute top-[17px] left-4 rounded-[24px] bg-white p-2 touch-manipulation active:scale-95"
        >
          <ArrowLeft className="h-4 w-4 text-[#0A0A0A]" />
        </button>

        {/* City selector pill */}
        <button
          ref={pickerToggleRef}
          onClick={onToggleCityPicker}
          className="absolute top-3 right-4 bg-[#F7F7F7] rounded-[43px] px-3 py-3 flex items-center justify-between w-[202px] touch-manipulation"
        >
          <span className="text-[14px] font-medium leading-[18px] text-[#0A0A0A]">
            {city.name_en} {city.name_zh}
          </span>
          <ChevronDown className="h-[18px] w-[18px] text-[#717375]" />
        </button>

        {/* City picker popup */}
        {showCityPicker && (
          <div className="absolute top-[56px] right-4 z-50">
            {cityPickerElement}
          </div>
        )}
      </div>

      {/* What to eat */}
      <div className="p-6">
        <h2 className="text-[22px] font-medium leading-[28px] text-[#0A0A0A]">
          What to eat in {city.name_en}
        </h2>
        {dishes.length > 0 && (
          <div className="mt-6 flex gap-[15px]">
            {dishes.map((dish) => (
              <button
                key={dish.label}
                onClick={() => setShowGallery(true)}
                className="flex flex-col gap-2 items-center w-[99px] shrink-0 touch-manipulation"
              >
                <div className="h-[94px] w-[99px] rounded-[4px] overflow-hidden bg-neutral-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={dish.image}
                    alt={dish.label}
                    className="h-full w-full object-cover"
                  />
                </div>
                <p className="text-[10px] font-medium text-[#0A0A0A] text-center leading-normal">
                  {dish.label}
                </p>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Top restaurants */}
      <div className="p-6 pt-0">
        <h2 className="text-[22px] font-medium leading-[28px] text-[#0A0A0A]">
          Top restaurants in {city.name_en}
        </h2>
        <div className="mt-6 flex flex-col gap-3">
          {cityRestaurants.map((restaurant) => (
            <RestaurantRow key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </div>

      {/* Photo gallery overlay */}
      {showGallery && (
        <div className="fixed inset-0 z-[2000] bg-white flex flex-col">
          {/* Top bar with close button */}
          <div className="flex items-center justify-end px-4 py-3 shrink-0">
            <button
              onClick={() => setShowGallery(false)}
              className="rounded-[24px] bg-white p-2 touch-manipulation active:scale-95"
            >
              <X className="h-4 w-4 text-[#0A0A0A]" />
            </button>
          </div>
          {/* Scrollable images */}
          <div className="flex-1 overflow-y-auto px-6 pb-8">
            <div className="flex flex-col gap-[21px]">
              {dishes.map((dish) => (
                <div key={dish.label} className="w-full h-[228px] rounded-[4px] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={dish.image}
                    alt={dish.label}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
