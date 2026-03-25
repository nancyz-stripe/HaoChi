"use client";

import { Dish } from "@/types";
import { SpiceBadge } from "./SpiceBadge";
import { DishBadges } from "./DishBadges";
import { CopyButton } from "./CopyButton";
import { useFavorites } from "@/hooks/use-favorites";
import { Heart, Check, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

interface DishCardProps {
  dish: Dish;
  recommendation?: string;
  compact?: boolean;
}

export function DishCard({ dish, recommendation, compact }: DishCardProps) {
  const { isFavorite, toggleFavorite, hasTried, toggleTried } = useFavorites();

  if (compact) {
    return (
      <div className="group rounded-xl border border-border bg-card p-4 transition-all hover:shadow-md">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h4 className="font-semibold text-foreground">{dish.name_en}</h4>
            <div className="mt-1 flex items-center gap-2">
              <span className="text-lg font-medium text-foreground/80">
                {dish.name_zh}
              </span>
              <CopyButton text={dish.name_zh} label="Chinese name" variant="inline" />
            </div>
            <p className="mt-0.5 text-xs text-muted-foreground italic">
              {dish.pinyin}
            </p>
          </div>
          <SpiceBadge level={dish.spice_level} />
        </div>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
          {dish.description}
        </p>
        <DishBadges dish={dish} className="mt-2" />
      </div>
    );
  }

  return (
    <div className="group rounded-xl border border-border bg-card overflow-hidden transition-all hover:shadow-lg">
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-semibold text-foreground">
              {dish.name_en}
            </h3>
            <div className="mt-1 flex items-center gap-2 flex-wrap">
              <span className="text-xl font-medium text-foreground/80">
                {dish.name_zh}
              </span>
              <CopyButton text={dish.name_zh} label="Chinese name" />
            </div>
            <p className="mt-1 text-sm text-muted-foreground italic">
              {dish.pinyin}
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <SpiceBadge level={dish.spice_level} />
            <div className="flex gap-1">
              <button
                onClick={() => toggleFavorite(dish.id)}
                className={cn(
                  "rounded-full p-1.5 transition-colors",
                  isFavorite(dish.id)
                    ? "bg-red-50 text-red-500"
                    : "text-muted-foreground hover:bg-accent"
                )}
                title={isFavorite(dish.id) ? "Remove from favorites" : "Save to favorites"}
              >
                <Heart
                  className={cn("h-4 w-4", isFavorite(dish.id) && "fill-current")}
                />
              </button>
              <button
                onClick={() => toggleTried(dish.id)}
                className={cn(
                  "rounded-full p-1.5 transition-colors",
                  hasTried(dish.id)
                    ? "bg-emerald-50 text-emerald-600"
                    : "text-muted-foreground hover:bg-accent"
                )}
                title={hasTried(dish.id) ? "Mark as not tried" : "I tried this!"}
              >
                <Check className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
          {dish.description}
        </p>

        <DishBadges dish={dish} className="mt-3" />

        {recommendation && (
          <div className="mt-3 rounded-lg bg-amber-50/50 border border-amber-100 p-3">
            <p className="text-sm text-amber-900">
              <span className="font-medium">Why order here:</span>{" "}
              {recommendation}
            </p>
          </div>
        )}

        {dish.why_it_matters && (
          <div className="mt-3 rounded-lg bg-blue-50/50 border border-blue-100 p-3">
            <p className="text-sm text-blue-900">
              <span className="font-medium">Why it matters:</span>{" "}
              {dish.why_it_matters}
            </p>
          </div>
        )}

        {dish.ordering_tip && (
          <div className="mt-3 flex items-start gap-2 text-sm text-muted-foreground">
            <Lightbulb className="h-4 w-4 mt-0.5 shrink-0 text-amber-500" />
            <p>
              <span className="font-medium text-foreground">Ordering tip:</span>{" "}
              {dish.ordering_tip}
            </p>
          </div>
        )}

        {dish.avoid_if.length > 0 && (
          <p className="mt-2 text-xs text-muted-foreground">
            <span className="font-medium">Avoid if you dislike:</span>{" "}
            {dish.avoid_if.join(", ")}
          </p>
        )}

        {/* Point-to-order card */}
        <div className="mt-4 rounded-lg border-2 border-dashed border-border p-4 text-center">
          <p className="text-xs text-muted-foreground mb-2 font-medium uppercase tracking-wide">
            Show this to staff
          </p>
          <p className="text-2xl font-bold text-foreground">{dish.name_zh}</p>
          <p className="text-sm text-muted-foreground mt-1">{dish.name_en}</p>
          <CopyButton
            text={dish.name_zh}
            label="Chinese dish name"
            variant="large"
            className="mt-3"
          />
        </div>
      </div>
    </div>
  );
}
