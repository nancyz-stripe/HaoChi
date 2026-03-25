"use client";

import { useState, useCallback } from "react";

export function useClipboard(timeout = 2000) {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const copy = useCallback(
    async (text: string, label?: string) => {
      try {
        await navigator.clipboard.writeText(text);
        setCopiedText(label || text);
        setTimeout(() => setCopiedText(null), timeout);
        return true;
      } catch {
        // Fallback for older browsers
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        setCopiedText(label || text);
        setTimeout(() => setCopiedText(null), timeout);
        return true;
      }
    },
    [timeout]
  );

  return { copy, copiedText, isCopied: copiedText !== null };
}
