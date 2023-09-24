import { assoc } from "ramda";
import { Address } from "viem";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { MMKV } from "react-native-mmkv";
import { StateStorage } from "zustand/middleware";

const storage = new MMKV();

export const zustandStorage: StateStorage = {
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
  client: any;
  publicClient: any;
  address: Address | null;
  verified: boolean;
  setVerified: (v: boolean) => void;
  setAddress: (address: Address) => void;
  setClient: (client: any) => void;
  setPublicClient: (publicClient: any) => void;
  setToken: (token: string) => void;
  setRefreshToken: (refreshToken: string) => void;
}

export const useAuthStorage = create<AuthStorage>()(
  persist(
    (set, get) => ({
      token: "",
      refreshToken: "",
      client: null,
      address: null,
      publicClient: null,
      verified: false,
      setVerified: (v: boolean) => set(assoc("verified", v)),
      setAddress: (address: Address) => set(assoc("address", address)),
      setToken: (token: string) => set((state) => assoc("token", token, state)),
      setClient: (client: any) => set(assoc("client", client)),
      setPublicClient: (publicClient: any) =>
        set(assoc("publicClient", publicClient)),
      setRefreshToken: (refreshToken: string) =>
        set((state) => assoc("refreshToken", refreshToken, state)),
    }),
    {
      name: "auth-storage", // unique name for the storage item
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
