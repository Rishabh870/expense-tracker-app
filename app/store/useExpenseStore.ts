import { create } from 'zustand';
import { ExpensesDetails } from '../utils/types';
import { PRIVATE_REQUEST } from '../utils/requestMethods';

type ExpenseStore = {
  expenses: ExpensesDetails[];
  loading: boolean;
  error: string | null;
  addExpense: (data: Omit<ExpensesDetails, 'id'>) => Promise<void>;
  getExpense: () => Promise<void>;
};

export const useExpenseStore = create<ExpenseStore>((set) => ({
  expenses: [],
  loading: false,

  error: null,
  addExpense: async (data) => {
    set({
      loading: true,
      error: null,
    });

    try {
      const res = await PRIVATE_REQUEST.post('/expense', data);
      const newExpense: ExpensesDetails = res.data;

      set((state) => {
        const oldExpense = state.expenses;
        oldExpense.push(newExpense);
        return {
          expenses: oldExpense,
          loading: false,
        };
      });
    } catch (error) {
      const message = (error as string) || 'Failed to add expense';
      set({ error: message, loading: false });
    }
  },
  getExpense: async () => {
    set({ loading: true, error: null });

    try {
      const res = await PRIVATE_REQUEST.get('/expense');
      const expenses: ExpensesDetails[] = res.data;
      set(() => ({
        expenses: expenses,
        loading: false,
      }));
    } catch (error) {
      const message = (error as string) || 'Failed to add expense';
      set({ error: message, loading: false });
    }
  },
}));
