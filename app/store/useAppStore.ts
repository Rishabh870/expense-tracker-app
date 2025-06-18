// store/useAppStore.ts
import { create } from 'zustand';
import db from '../data/db.json';

type State = {
  items: typeof db.items;
};

export const useAppStore = create<State>(() => ({
  items: db.items,
}));
