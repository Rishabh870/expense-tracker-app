import { create } from "zustand";
import { SplitUser } from "../utils/interfaces";
import { PRIVATE_REQUEST } from "../utils/requestMethods";

interface PersonStore {
  persons: SplitUser[];
  loading?: boolean;
  fetchSplitPersons: () => Promise<void>;
}

export const usePersonStore = create<PersonStore>((set, get) => ({
  persons: [],
  page: 1,
  loading: false,
  fetchSplitPersons: async () => {
    try {
      set({ loading: true });
      const res = await PRIVATE_REQUEST.get("/split-user/");
      set({ persons: res.data });
    } catch (error) {
      console.error(error);
    } finally {
      set({ loading: false });
    }
  },
}));
