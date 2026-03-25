"use client";

import { Check, Copy } from "lucide-react";
import { useClipboard } from "@/hooks/use-clipboard";
import { cn } from "@/lib/utils";

interface CopyButtonProps {
  text: string;
  label?: string;
  className?: string;
  variant?: "default" | "inline" | "large";
}

export function CopyButton({
  text,
  label,
  className,
  variant = "default",
}: CopyButtonProps) {
  const { copy, copiedText } = useClipboard();
  const isCopied = copiedText === (label || text);

  return (
    <button
      onClick={() => copy(text, label || text)}
      className={cn(
        "inline-flex items-center gap-1.5 transition-all duration-200",
        variant === "default" &&
          "rounded-md border border-border bg-card px-2.5 py-1.5 text-xs font-medium text-muted-foreground hover:bg-accent hover:text-foreground",
        variant === "inline" &&
          "rounded px-1.5 py-0.5 text-xs text-muted-foreground hover:bg-accent hover:text-foreground",
        variant === "large" &&
          "rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground hover:bg-accent",
        isCopied && "border-emerald-300 bg-emerald-50 text-emerald-700",
        className
      )}
      title={`Copy: ${text}`}
    >
      {isCopied ? (
        <>
          <Check className="h-3.5 w-3.5" />
          <span>Copied</span>
        </>
      ) : (
        <>
          <Copy className="h-3.5 w-3.5" />
          <span>{label || "Copy"}</span>
        </>
      )}
    </button>
  );
}
