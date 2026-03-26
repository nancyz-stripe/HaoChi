import { Dish } from "@/types";
import { cn } from "@/lib/utils";

export function DishBadges({ dish, className }: { dish: Dish; className?: string }) {
  const badges: { label: string; color: string }[] = [];

  if (dish.first_timer_friendly) {
    badges.push({ label: "Good first dish", color: "text-emerald-700 bg-emerald-50" });
  }
  if (dish.adventurous) {
    badges.push({ label: "Adventurous", color: "text-violet-700 bg-violet-50" });
  }
  if (dish.dietary_flags.includes("contains-offal")) {
    badges.push({ label: "Contains offal", color: "text-amber-700 bg-amber-50" });
  }
  if (dish.dietary_flags.includes("contains-blood")) {
    badges.push({ label: "Contains blood", color: "text-amber-700 bg-amber-50" });
  }
  if (dish.dietary_flags.includes("vegetarian")) {
    badges.push({ label: "Vegetarian", color: "text-emerald-700 bg-emerald-50" });
  }
  if (dish.dietary_flags.includes("can-be-vegetarian")) {
    badges.push({ label: "Can be vegetarian", color: "text-emerald-700 bg-emerald-50" });
  }
  if (dish.dietary_flags.includes("contains-lamb")) {
    badges.push({ label: "Contains lamb", color: "text-muted-foreground bg-secondary" });
  }

  if (badges.length === 0) return null;

  return (
    <div className={cn("flex flex-wrap gap-1", className)}>
      {badges.map((b) => (
        <span
          key={b.label}
          className={cn(
            "rounded-md px-2 py-0.5 text-[11px] font-medium",
            b.color
          )}
        >
          {b.label}
        </span>
      ))}
    </div>
  );
}
