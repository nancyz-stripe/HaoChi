"use client";

import { Dish } from "@/types";
import { SpiceBadge } from "./SpiceBadge";
import { DishBadges } from "./DishBadges";
import { CopyButton } from "./CopyButton";
import { useFavorites } from "@/hooks/use-favorites";
import { Heart, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface DishCardProps {
  dish: Dish;
  recommendation?: string;
  compact?: boolean;
}

export function DishCard({ dish, recommendation, compact }: DishCardProps) {
  const { isFavorite, toggleFavorite, hasTried, toggleTried } = useFavorites();
  const [expanded, setExpanded] = useState(false);

  if (compact) {
    return (
      <div className="rounded-lg border border-border bg-card p-3.5">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-foreground leading-tight">{dish.name_en}</p>
            <div className="mt-1 flex items-center gap-1.5">
              <span className="text-base text-foreground/70">{dish.name_zh}</span>
              <CopyButton text={dish.name_zh} label="Name" variant="inline" />
            </div>
            <p className="mt-0.5 text-[11px] text-muted-foreground">{dish.pinyin}</p>
          </div>
          <SpiceBadge level={dish.spice_level} />
        </div>
        <p className="mt-2 text-xs text-muted-foreground leading-relaxed line-clamp-2">
          {dish.description}
        </p>
        <DishBadges dish={dish} className="mt-2" />
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <p className="text-[15px] font-semibold text-foreground leading-tight">
              {dish.name_en}
            </p>
            <div className="mt-1 flex items-center gap-1.5 flex-wrap">
              <span className="text-lg text-foreground/70">{dish.name_zh}</span>
              <CopyButton text={dish.name_zh} label="Name" variant="inline" />
            </div>
            <p className="mt-0.5 text-[11px] text-muted-foreground">{dish.pinyin}</p>
          </div>
          <div className="flex items-center gap-0.5 shrink-0">
            <button
              onClick={() => toggleFavorite(dish.id)}
              className={cn(
                "rounded-full p-2 transition-colors touch-manipulation active:scale-95",
                isFavorite(dish.id)
                  ? "text-red-500"
                  : "text-muted-foreground/40 hover:text-muted-foreground"
              )}
            >
              <Heart className={cn("h-4 w-4", isFavorite(dish.id) && "fill-current")} />
            </button>
            <button
              onClick={() => toggleTried(dish.id)}
              className={cn(
                "rounded-full p-2 transition-colors touch-manipulation active:scale-95",
                hasTried(dish.id)
                  ? "text-emerald-600"
                  : "text-muted-foreground/40 hover:text-muted-foreground"
              )}
            >
              <Check className={cn("h-4 w-4", hasTried(dish.id) && "stroke-[3]")} />
            </button>
          </div>
        </div>

        {/* Badges row */}
        <div className="mt-2.5 flex items-center gap-1.5 flex-wrap">
          <SpiceBadge level={dish.spice_level} />
          <DishBadges dish={dish} />
        </div>

        {/* Description */}
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
          {dish.description}
        </p>

        {recommendation && (
          <div className="mt-3 rounded-md bg-secondary p-3">
            <p className="text-xs text-foreground leading-relaxed">
              <span className="font-semibold">Why order here</span>{" "}
              <span className="text-muted-foreground">— {recommendation}</span>
            </p>
          </div>
        )}

        {/* Expandable details */}
        {(dish.why_it_matters || dish.ordering_tip || dish.avoid_if.length > 0) && (
          <>
            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-3 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors touch-manipulation"
            >
              {expanded ? "Less info" : "More info"}
            </button>

            {expanded && (
              <div className="mt-3 space-y-3 text-sm">
                {dish.why_it_matters && (
                  <p className="text-muted-foreground leading-relaxed">
                    <span className="font-medium text-foreground">Why it matters:</span>{" "}
                    {dish.why_it_matters}
                  </p>
                )}
                {dish.ordering_tip && (
                  <p className="text-muted-foreground leading-relaxed">
                    <span className="font-medium text-foreground">Ordering tip:</span>{" "}
                    {dish.ordering_tip}
                  </p>
                )}
                {dish.avoid_if.length > 0 && (
                  <p className="text-xs text-muted-foreground">
                    <span className="font-medium">Avoid if you dislike:</span>{" "}
                    {dish.avoid_if.join(", ")}
                  </p>
                )}
              </div>
            )}
          </>
        )}
      </div>

      {/* Point-to-order strip */}
      <div className="border-t border-border bg-secondary/50 px-4 py-3 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">
            Show to staff
          </p>
          <p className="text-lg font-semibold text-foreground mt-0.5 truncate">{dish.name_zh}</p>
        </div>
        <CopyButton text={dish.name_zh} label="Copy" />
      </div>
    </div>
  );
}
