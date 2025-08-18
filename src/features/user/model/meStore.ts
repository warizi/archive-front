import type { User } from "@/entities/user"
import { create } from "zustand"


interface MeStore {
  user: User | null
  setUser: (user: User) => void
  reset: () => void
}

const useMeStore = create<MeStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  reset: () => set({ user: null }),
}));

export default useMeStore;