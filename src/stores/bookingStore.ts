"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { BookingRequest } from "@/types/realtor";

interface BookingState {
  bookings: BookingRequest[];
  addBooking: (
    booking: Omit<BookingRequest, "id" | "createdAt">,
  ) => BookingRequest;
}

export const useBookingStore = create<BookingState>()(
  persist(
    (set, get) => ({
      bookings: [],
      addBooking: (input) => {
        const created: BookingRequest = {
          ...input,
          id: `bk-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          createdAt: new Date().toISOString(),
        };
        set({ bookings: [created, ...get().bookings] });
        return created;
      },
    }),
    {
      name: "makon-booking-requests",
    },
  ),
);
