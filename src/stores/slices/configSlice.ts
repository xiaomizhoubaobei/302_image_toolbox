import { StateCreator } from "zustand";

type State = {
  region: number;
  domain: string;
  token: string;
  user: string;
  code: string;
};

type Actions = {
  setRegion: (region: number) => void;
  setDomain: (domain: string) => void;
  setToken: (token: string) => void;
  setUser: (user: string) => void;
  setCode: (code: string) => void;
};

export type ConfigStore = State & Actions;

export const createConfigSlice: StateCreator<
  ConfigStore,
  [],
  [],
  ConfigStore
> = (set) => ({
  region: 1,
  domain: 'https://302.ai',
  token: '',
  user: '',
  code: '',
  setRegion: (region: number) => set({ region }),
  setDomain: (domain: string) => set({ domain }),
  setToken: (token: string) => set({ token }),
  setUser: (user: string) => set({ user }),
  setCode: (code: string) => set({ code }),
});
