import { Dish } from "@/types";
import { cn } from "@/lib/utils";
import { ThumbsUp, Compass, AlertTriangle } from "lucide-react";

export function DishBadges({ dish, className }: { dish: Dish; className?: string }) {
  return (
    <div className={cn("flex flex-wrap gap-1.5", className)}>
      {dish.first_timer_friendly && (
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
          <ThumbsUp className="h-3 w-3" />
          Good first dish
        </span>
      )}
      {dish.adventurous && (
        <span className="inline-flex items-center gap-1 rounded-full bg-purple-50 px-2.5 py-0.5 text-xs font-medium text-purple-700">
          <Compass className="h-3 w-3" />
          Adventurous
        </span>
      )}
      {dish.dietary_flags.includes("contains-offal") && (
        <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-700">
          <AlertTriangle className="h-3 w-3" />
          Contains offal
        </span>
      )}
      {dish.dietary_flags.includes("contains-blood") && (
        <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-700">
          <AlertTriangle className="h-3 w-3" />
          Contains blood
        </span>
      )}
      {dish.dietary_flags.includes("vegetarian") && (
        <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700">
          Vegetarian
        </span>
      )}
      {dish.dietary_flags.includes("can-be-vegetarian") && (
        <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700">
          Can be vegetarian
        </span>
      )}
      {dish.dietary_flags.includes("contains-lamb") && (
        <span className="inline-flex items-center gap-1 rounded-full bg-orange-50 px-2.5 py-0.5 text-xs font-medium text-orange-700">
          Contains lamb
        </span>
      )}
    </div>
  );
}
