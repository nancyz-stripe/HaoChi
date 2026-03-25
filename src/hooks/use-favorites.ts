"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "cfb-favorites";
const TRIED_KEY = "cfb-tried";

function getStored(key: string): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(key) || "[]");
  } catch {
    return [];
  }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [tried, setTried] = useState<string[]>([]);

  useEffect(() => {
    setFavorites(getStored(STORAGE_KEY));
    setTried(getStored(TRIED_KEY));
  }, []);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) => {
      const next = prev.includes(id)
        ? prev.filter((f) => f !== id)
        : [...prev, id];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const toggleTried = useCallback((id: string) => {
    setTried((prev) => {
      const next = prev.includes(id)
        ? prev.filter((f) => f !== id)
        : [...prev, id];
      localStorage.setItem(TRIED_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const isFavorite = useCallback(
    (id: string) => favorites.includes(id),
    [favorites]
  );

  const hasTried = useCallback((id: string) => tried.includes(id), [tried]);

  return { favorites, tried, toggleFavorite, toggleTried, isFavorite, hasTried };
}
