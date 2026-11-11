"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SavedState {
  savedIds: string[];
  toggleSaved: (propertyId: string) => boolean;
  clearSaved: () => void;
}

export const useSavedStore = create<SavedState>()(
  persist(
    (set, get) => ({
      savedIds: [],
      toggleSaved: (propertyId) => {
        const current = get().savedIds;
        const exists = current.includes(propertyId);
        const next = exists
          ? current.filter((id) => id !== propertyId)
          : [propertyId, ...current];
        set({ savedIds: next });
        return !exists;
      },
      clearSaved: () => set({ savedIds: [] }),
    }),
    {
      name: "makon-saved-properties",
    },
  ),
);
