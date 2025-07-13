import { create } from "zustand";
import { expenses as ExpenseDetailData } from "../data/expenseDetailsData";
import { ExpensesDetails, GroupedExpenseDetails } from "../types/expense.types";
import { PRIVATE_REQUEST } from "../utils/requestMethods";
import { AxiosError } from "axios";
import { handleAxiosError } from "../utils/AxiosError";
// import { PRIVATE_REQUEST } from '../utils/requestMethods'; // for future API integration

const PAGE_LIMIT = 10;

interface ExpenseDetailStore {
  expenses: ExpensesDetails[];
  groupedExpensed: GroupedExpenseDetails[];
  page: number;
  hasMore: boolean;
  loading: boolean;
  addExpense: (expense: Partial<ExpensesDetails>) => Promise<void>;
  fetchExpenses: () => Promise<void>;
}

export const useExpenseDetailStore = create<ExpenseDetailStore>((set, get) => ({
  expenses: [],
  groupedExpensed: [],
  page: 1,
  hasMore: true,
  loading: false,
  addExpense: async (payload) => {
    try {
      console.warn(payload);
      const res = await PRIVATE_REQUEST.post("/expense", payload);
      set((state) => ({ expenses: [res.data, ...state.expenses] }));
    } catch (error) {
      if (error instanceof AxiosError) {
        handleAxiosError(error);
      }
    } finally {
      set({ loading: false });
    }
  },
  fetchExpenses: async () => {
    set({ loading: true });
    try {
      const res = await PRIVATE_REQUEST.get<GroupedExpenseDetails[]>(
        "/expense/grouped-by-date"
      );
      set({ groupedExpensed: res.data });
    } catch (error) {
      if (error instanceof AxiosError) {
        handleAxiosError(error);
      }
    } finally {
      set({ loading: false });
    }
  },
}));
