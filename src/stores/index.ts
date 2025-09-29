import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createConfigSlice, ConfigStore } from "./slices/configSlice";

// type StoreState = ChatStore & ConfigStore;
type StoreState = ConfigStore;

export const useStore = create<StoreState>()(
  (...a) => ({
    ...createConfigSlice(...a),
  }),
);

