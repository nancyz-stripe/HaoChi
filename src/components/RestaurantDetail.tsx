"use client";

import { Restaurant } from "@/types";
import { getRecommendationsForRestaurant } from "@/data";
import { ArrowLeft, Copy, Volume2, Sparkles, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { cities } from "@/data/cities";
import { useState, useCallback } from "react";
import { BottomNav } from "./BottomNav";

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

  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);

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
          <ArrowLeft className="h-[18px] w-[18px] text-[#1A2C44]" />
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
            <p className="text-[16px] font-normal leading-[22px] text-[#1A2C44]">
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
            className="text-[16px] font-medium leading-[22px] text-[#1A2C44] underline text-left w-fit touch-manipulation"
          >
            View in map
          </button>
        </div>

        {/* Food recommendations */}
        <h2 className="mt-6 text-[18px] font-medium leading-[24px] text-[#0A0A0A]">
          Food recommendations
        </h2>

        <div className="mt-4 flex flex-col gap-3">
          {recs.map((rec) => {
            const dish = rec.dish;
            const isMustTry = mustOrderIds.has(dish.id);

            return (
              <div
                key={rec.dish_id}
                className="rounded-[12px] border border-[#E4E9EC] p-[14px] flex flex-col gap-2"
              >
                {/* Top row: image + content */}
                <div className="flex gap-2 items-start">
                  {/* Dish image */}
                  <button
                    onClick={() => setEnlargedImage("/images/dishes/cq-hotpot.png")}
                    className="h-[84px] w-[88px] shrink-0 rounded-[3.5px] overflow-hidden bg-neutral-100 touch-manipulation"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/dishes/cq-hotpot.png"
                      alt={dish.name_en}
                      className="h-full w-full object-cover"
                    />
                  </button>
                  {/* Content */}
                  <div className="flex flex-col gap-2 flex-1 min-w-0">
                    {isMustTry && (
                      <span className="self-start inline-flex items-center gap-1 rounded-[4px] bg-[#F4F7FA] px-2 py-1 text-[9px] font-medium text-[#1A2C44]">
                        <Sparkles className="h-3 w-3" />
                        MUST TRY
                      </span>
                    )}
                    <p className="text-[16px] font-medium leading-[22px] text-[#0A0A0A]">
                      {dish.name_en} {dish.name_zh}
                    </p>
                    <div className="flex items-center gap-2">
                      <p className="text-[14px] font-normal text-[#1A2C44]">
                        {dish.pinyin}
                      </p>
                      <button
                        onClick={() => speakChinese(dish.name_zh)}
                        className="shrink-0 touch-manipulation active:scale-95"
                      >
                        <Volume2 className="h-[18px] w-[18px] text-[#1A2C44]" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-[#ECF1F6]" />

                {/* Description */}
                <p className="text-[16px] font-normal text-[#1A2C44] leading-normal">
                  {dish.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      {/* Enlarged dish image overlay */}
      {enlargedImage && (
        <div
          className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/30"
          onClick={() => setEnlargedImage(null)}
        >
          <div
            className="bg-white rounded-[24px] py-6 px-6 flex flex-col items-center"
            style={{ boxShadow: "0 4px 18px rgba(0,0,0,0.24)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-[281px] h-[266px] rounded-[3.5px] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={enlargedImage}
                alt="Dish"
                className="h-full w-full object-cover"
              />
              <button
                onClick={() => setEnlargedImage(null)}
                className="absolute top-3 right-3 rounded-[24px] bg-white p-2 touch-manipulation active:scale-95"
              >
                <X className="h-[18px] w-[18px] text-[#1A2C44]" />
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNav
        onTabChange={(tab) => {
          if (tab === "map") {
            router.push(`/?tab=map&city=${city?.slug}&restaurant=${restaurant.id}`);
          } else {
            router.push("/");
          }
        }}
      />
    </div>
  );
}

/** Small copy icon matching the Figma design (two overlapping rectangles) */
function CopyIcon() {
  return (
    <Copy className="h-[18px] w-[18px] text-[#1A2C44]" />
  );
}
