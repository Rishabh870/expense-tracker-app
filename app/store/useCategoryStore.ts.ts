import { create } from 'zustand';
import { categories as categoriesData } from '../data/categoryData';
import { Category } from '../utils/interfaces';

const PAGE_LIMIT = 5;

interface CategoryStore {
  categories: Category[];
  page: number;
  hasMore: boolean;
  loading: boolean;
  load: () => void;
}

export const useCategoryStore = create<CategoryStore>((set, get) => ({
  categories: [],
  page: 1,
  hasMore: true,
  loading: false,
  load: () => {
    const { page, categories } = get();
    set({ loading: true });

    const start = (page - 1) * PAGE_LIMIT;
    const end = start + PAGE_LIMIT;
    const fullData = categoriesData as Category[];
    const data = fullData.slice(start, end);

    set({
      categories: [...categories, ...data],
      page: page + 1,
      hasMore: end < fullData.length,
      loading: false,
    });
  },
}));
