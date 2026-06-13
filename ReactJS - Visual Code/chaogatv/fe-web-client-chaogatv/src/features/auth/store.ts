import { create } from "zustand";
import type { User } from "./types";
import { persist } from "zustand/middleware";

// features/auth/store.ts
interface AuthStore {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      login: (user, token) => set({ user, token }),
      logout: () => set({ user: null, token: null }),
    }),
    { name: "auth-storage" }, // ← Zustand persist tự lo localStorage
  ),
);
