import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { zustandStorage } from "./authStore";

import P60 from "../../assets/ethnyc.jpeg";
import Highline from "../../assets/highline.jpeg";

const initMarkers: IMarkerData[] = [
  {
    coordinate: { latitude: 40.765090592441226, longitude: -74.00127220343919 },
    contentType: "image",
    contentUrl: P60,
  },
  {
    coordinate: { latitude: 40.73724035334979, longitude: -74.01048585126827 },
    contentType: "image",
    contentUrl: Highline,
  },
  {
    coordinate: { latitude: 40.71271668840441, longitude: -74.01226299151534 },
    contentType: "audio",
    contentUrl: "",
  },
];

interface ICoordinate {
  latitude: number;
  longitude: number;
}

interface IMarkerData {
  coordinate: ICoordinate;
  contentType: "image" | "audio";
  contentUrl: string;
}

type MarkerState = {
  markers: IMarkerData[];
  addMarker: (marker: IMarkerData) => void;
};

export const useMarkerStorage = create<MarkerState>()(
  persist(
    (set, get) => ({
      markers: initMarkers,
      addMarker: (marker) =>
        set((state) => ({ markers: [...state.markers, marker] })),
    }),
    {
      name: "auth-storage", // unique name for the storage item
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
