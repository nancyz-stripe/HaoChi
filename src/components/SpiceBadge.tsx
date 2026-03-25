import { SpiceLevel } from "@/types";
import { cn } from "@/lib/utils";
import { Flame } from "lucide-react";

const config: Record<SpiceLevel, { label: string; color: string; flames: number }> = {
  none: { label: "No spice", color: "bg-slate-100 text-slate-600", flames: 0 },
  mild: { label: "Mild", color: "bg-yellow-50 text-yellow-700", flames: 1 },
  medium: { label: "Medium", color: "bg-orange-50 text-orange-700", flames: 2 },
  hot: { label: "Hot", color: "bg-red-50 text-red-700", flames: 3 },
  very_hot: { label: "Very hot", color: "bg-red-100 text-red-800", flames: 4 },
};

export function SpiceBadge({
  level,
  className,
}: {
  level: SpiceLevel;
  className?: string;
}) {
  const { label, color, flames } = config[level];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium",
        color,
        className
      )}
    >
      {flames > 0 && (
        <span className="flex">
          {Array.from({ length: flames }).map((_, i) => (
            <Flame key={i} className="h-3 w-3 -ml-0.5 first:ml-0" />
          ))}
        </span>
      )}
      {label}
    </span>
  );
}
