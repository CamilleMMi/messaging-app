import { create } from "zustand";
import { createAuthSlice } from "./slices/auth.slide-1.0.0";

export const useAppStore = create()((...args) => ({
    ...createAuthSlice(...args),
}));