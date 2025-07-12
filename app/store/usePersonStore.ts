import { create } from 'zustand';
import { persons as splitPersonsData } from '../data/personData'; // Adjust path as needed
import { SplitUser } from '../utils/interfaces';

const PAGE_LIMIT = 5;

interface PersonStore {
  persons: SplitUser[];
  page: number;
  hasMore: boolean;
  loading: boolean;
  load: () => void;
}

export const usePersonStore = create<PersonStore>((set, get) => ({
  persons: [],
  page: 1,
  hasMore: true,
  loading: false,
  load: () => {
    const { page, persons } = get();
    set({ loading: true });

    const start = (page - 1) * PAGE_LIMIT;
    const end = start + PAGE_LIMIT;
    const fullData = splitPersonsData as SplitUser[];
    const data = fullData.slice(start, end);

    set({
      persons: [...persons, ...data],
      page: page + 1,
      hasMore: end < fullData.length,
      loading: false,
    });
  },
}));
