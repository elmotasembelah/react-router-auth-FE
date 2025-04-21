import { create } from "zustand";
import axios from "axios";
import { User } from "../types/user.type";

interface AuthState {
  user: User | null;
  hasHydrated: boolean;
  setUser: (user: User) => void;
  clearUser: () => void;
  hydrate: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  hasHydrated: false,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
  hydrate: async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/v1/users/me", {
        withCredentials: true,
      });
      set({ user: res.data, hasHydrated: true });
    } catch {
      set({ user: null, hasHydrated: true });
    }
  },
}));
