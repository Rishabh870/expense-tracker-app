import { create } from "zustand";
import { CategoryItem } from "../types/category.types";
import { PRIVATE_REQUEST } from "../utils/requestMethods";
import { BudgetItem } from "../types/budget.types";

const PAGE_LIMIT = 5;

type CategoryState = {
  categories: CategoryItem[];
  net_budget?: BudgetItem | null;
  loading: boolean;
  hasMore: boolean;
  fetchCategories: () => Promise<void>;
};

export const useCategoryStore = create<CategoryState>((set, get) => ({
  categories: [],
  loading: false,
  hasMore: false,

  fetchCategories: async () => {
    try {
      set({ loading: true });
      const res = await PRIVATE_REQUEST.get<CategoryItem[]>("/category/");
      const data = res.data;
      const net_budget = data.find((item) => item.is_net);
      console.log(data)
      if (net_budget) {
        set({ net_budget: net_budget.budgets });
      }
      set({ categories: data.filter((item)=>!item.is_net) || [] });
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  },
}));
