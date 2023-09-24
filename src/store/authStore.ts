import { assoc } from "ramda";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { MMKV } from "react-native-mmkv";
import { StateStorage } from "zustand/middleware";

const storage = new MMKV();

const zustandStorage: StateStorage = {
  setItem: (name, value) => {
    return storage.set(name, value);
  },
  getItem: (name) => {
    const value = storage.getString(name);
    return value ?? null;
  },
  removeItem: (name) => {
    return storage.delete(name);
  },
};

interface AuthStorage {
  token: string;
  refreshToken: string;
  setToken: (token: string) => void;
  setRefreshToken: (refreshToken: string) => void;
}

export const useAuthStorage = create<AuthStorage>()(
  persist(
    (set, get) => ({
      token: "",
      refreshToken: "",
      // Use Ramda's assoc function for setting token and refreshToken
      setToken: (token: string) => set((state) => assoc("token", token, state)),
      setRefreshToken: (refreshToken: string) =>
        set((state) => assoc("refreshToken", refreshToken, state)),
    }),
    {
      name: "auth-storage", // unique name for the storage item
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
