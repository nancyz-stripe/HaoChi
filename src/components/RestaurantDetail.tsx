"use client";

import { Restaurant } from "@/types";
import { getRecommendationsForRestaurant } from "@/data";
import { ArrowLeft, Copy, Volume2, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { cities } from "@/data/cities";
import { useState, useCallback } from "react";

function useCopy() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copy = useCallback((text: string, id: string) => {
    navigator.clipboard.writeText(text).catch(() => {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    });
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  }, []);

  return { copiedId, copy };
}

function speakChinese(text: string) {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "zh-CN";
  utterance.rate = 0.85;

  function setVoiceAndSpeak() {
    const voices = window.speechSynthesis.getVoices();
    const zhVoice =
      voices.find((v) => v.lang.startsWith("zh") && v.localService) ||
      voices.find((v) => v.lang.startsWith("zh"));
    if (zhVoice) utterance.voice = zhVoice;
    window.speechSynthesis.speak(utterance);
  }

  // Voices may not be loaded yet on first call
  if (window.speechSynthesis.getVoices().length > 0) {
    setVoiceAndSpeak();
  } else {
    window.speechSynthesis.onvoiceschanged = () => {
      setVoiceAndSpeak();
    };
  }
}

interface RestaurantDetailProps {
  restaurant: Restaurant;
}

export function RestaurantDetail({ restaurant }: RestaurantDetailProps) {
  const router = useRouter();
  const city = cities.find((c) => c.id === restaurant.city_id);
  const recs = getRecommendationsForRestaurant(restaurant.id);
  const { copiedId, copy } = useCopy();

  // Determine which dishes are "must try"
  const mustOrderIds = new Set(restaurant.must_order_dish_ids || []);

  return (
    <div className="min-h-[100dvh] bg-white">
      {/* Top bar */}
      <div className="sticky top-0 z-20 bg-white px-4 py-3">
        <button
          onClick={() => router.back()}
          className="rounded-[24px] bg-white p-2 touch-manipulation active:scale-95"
        >
          <ArrowLeft className="h-4 w-4 text-[#0A0A0A]" />
        </button>
      </div>

      {/* Content */}
      <div className="px-6 pt-2 pb-24">
        {/* Restaurant info */}
        <div className="flex flex-col gap-3">
          {/* Name + copy */}
          <div className="flex items-center gap-2">
            <h1 className="text-[22px] font-medium leading-[28px] text-[#0A0A0A]">
              {restaurant.name_en} {restaurant.name_zh}
            </h1>
            <button
              onClick={() => copy(restaurant.name_zh, "name")}
              className="shrink-0 touch-manipulation active:scale-95"
            >
              {copiedId === "name" ? (
                <span className="inline-flex items-center rounded-[4px] bg-[#F4F7FA] px-1 py-[2px] text-[10px] font-medium text-[#1A2C44]">Copied!</span>
              ) : (
                <CopyIcon />
              )}
            </button>
          </div>

          {/* Address + copy */}
          <div className="flex items-center gap-2">
            <p className="text-[14px] font-normal leading-[18px] text-[#3D3F40]">
              {restaurant.address_zh}
            </p>
            <button
              onClick={() => copy(restaurant.address_zh, "address")}
              className="shrink-0 touch-manipulation active:scale-95"
            >
              {copiedId === "address" ? (
                <span className="inline-flex items-center rounded-[4px] bg-[#F4F7FA] px-1 py-[2px] text-[10px] font-medium text-[#1A2C44]">Copied!</span>
              ) : (
                <CopyIcon />
              )}
            </button>
          </div>

          {/* View in map */}
          <button
            onClick={() => {
              router.push(`/?tab=map&city=${city?.slug}&restaurant=${restaurant.id}`);
            }}
            className="text-[14px] font-medium leading-[18px] text-[#717375] underline text-left w-fit touch-manipulation"
          >
            View in map
          </button>
        </div>

        {/* Food recommendations */}
        <h2 className="mt-6 text-[16px] font-medium leading-[22px] text-[#0A0A0A]">
          Food recommendations
        </h2>

        <div className="mt-6 flex flex-col gap-3">
          {recs.map((rec) => {
            const dish = rec.dish;
            const isMustTry = mustOrderIds.has(dish.id);

            return (
              <div
                key={rec.dish_id}
                className="rounded-[12px] border border-[#E4E9EC] p-[14px] flex flex-col gap-2"
              >
                {/* Dish name row */}
                <div className="flex flex-col gap-[2px]">
                  <div className="flex items-center justify-between gap-6">
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      <p className="text-[14px] font-medium text-[#0A0A0A] flex-1 min-w-0">
                        {dish.name_en} {dish.name_zh}
                      </p>
                      <button
                        onClick={() => speakChinese(dish.name_zh)}
                        className="shrink-0 touch-manipulation active:scale-95"
                      >
                        <Volume2 className="h-4 w-4 text-[#717375]" />
                      </button>
                    </div>
                    {isMustTry && (
                      <span className="shrink-0 inline-flex items-center gap-1 rounded-[4px] bg-[#F4F7FA] px-2 py-1 text-[9px] font-medium text-[#1A2C44]">
                        <Sparkles className="h-3 w-3" />
                        MUST TRY
                      </span>
                    )}
                  </div>
                  <p className="text-[12px] font-normal text-[#717375]">
                    {dish.pinyin}
                  </p>
                </div>

                {/* Description */}
                <p className="text-[12px] font-normal text-[#717375] leading-normal">
                  {dish.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/** Small copy icon matching the Figma design (two overlapping rectangles) */
function CopyIcon() {
  return (
    <Copy className="h-4 w-4 text-[#717375]" />
  );
}
