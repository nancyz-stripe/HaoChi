import { SpiceLevel } from "@/types";
import { cn } from "@/lib/utils";

const config: Record<SpiceLevel, { label: string; color: string; dots: number }> = {
  none: { label: "No spice", color: "text-muted-foreground bg-secondary", dots: 0 },
  mild: { label: "Mild", color: "text-amber-700 bg-amber-50", dots: 1 },
  medium: { label: "Medium", color: "text-orange-700 bg-orange-50", dots: 2 },
  hot: { label: "Hot", color: "text-red-600 bg-red-50", dots: 3 },
  very_hot: { label: "Very hot", color: "text-red-700 bg-red-100", dots: 4 },
};

export function SpiceBadge({
  level,
  className,
}: {
  level: SpiceLevel;
  className?: string;
}) {
  const { label, color, dots } = config[level];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-[11px] font-medium",
        color,
        className
      )}
    >
      {dots > 0 && (
        <span className="flex gap-0.5">
          {Array.from({ length: dots }).map((_, i) => (
            <span key={i} className="inline-block h-1 w-1 rounded-full bg-current" />
          ))}
        </span>
      )}
      {label}
    </span>
  );
}
