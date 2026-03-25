"use client";

import { useState, useEffect, useCallback } from "react";
import { UserTastePreference } from "@/types";

const STORAGE_KEY = "cfb-preferences";

const defaultPreferences: UserTastePreference = {
  spice_tolerance: "medium",
  adventurous_eater: false,
  avoids_offal: false,
  halal_friendly_only: false,
  vegetarian_preference: false,
};

export function usePreferences() {
  const [preferences, setPreferences] =
    useState<UserTastePreference>(defaultPreferences);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setPreferences(JSON.parse(stored));
    } catch {
      // ignore
    }
  }, []);

  const updatePreference = useCallback(
    <K extends keyof UserTastePreference>(
      key: K,
      value: UserTastePreference[K]
    ) => {
      setPreferences((prev) => {
        const next = { ...prev, [key]: value };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        return next;
      });
    },
    []
  );

  return { preferences, updatePreference };
}
