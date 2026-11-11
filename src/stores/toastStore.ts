"use client";

import { create } from "zustand";

interface ToastState {
  message: string | null;
  showToast: (message: string) => void;
  hideToast: () => void;
}

let activeTimer: ReturnType<typeof setTimeout> | null = null;

export const useToastStore = create<ToastState>((set) => ({
  message: null,
  showToast: (message) => {
    if (activeTimer) {
      clearTimeout(activeTimer);
    }
    set({ message });
    activeTimer = setTimeout(() => {
      set({ message: null });
      activeTimer = null;
    }, 3000);
  },
  hideToast: () => {
    if (activeTimer) {
      clearTimeout(activeTimer);
      activeTimer = null;
    }
    set({ message: null });
  },
}));
