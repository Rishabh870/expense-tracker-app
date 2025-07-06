import { create } from 'zustand';
import { ExpensesDetails } from '../utils/types';
import { PRIVATE_REQUEST } from '../utils/requestMethods';

export type ExpenseStore = {
  expenses: ExpensesDetails[];
  chartExpenses: ExpensesDetails[];
  loading: boolean;
  error: string | null;
  addExpense: (data: Omit<ExpensesDetails, 'id'>) => Promise<void>;
  getExpense: () => Promise<void>;
  getChartExpenses: () => Promise<void>;
};

export const useExpenseStore = create<ExpenseStore>((set) => ({
  expenses: [],
  chartExpenses: [
    {
      id: 1,
      title: 'Groceries',
      amount: 120,
      category: {
        id: 1,
        name: 'Food',
        description: 'Groceries and restaurants',
        icon: 'IconBasketFilled',
        bgColor: '#F87171',
      },
      date: new Date().toISOString(),
      payer: 1,
      splits: [],
      items: [],
      createdAt: Date.now().toString(),
    },
    {
      id: 2,
      title: 'Cab Ride',
      amount: 75,
      category: {
        id: 2,
        name: 'Transport',
        description: 'Taxi and rides',
        icon: 'IconBus',
        bgColor: '#60A5FA',
      },
      date: new Date(
        new Date().setDate(new Date().getDate() - 2),
      ).toISOString(),
      payer: 2,
      splits: [],
      items: [],
      createdAt: Date.now().toString(),
    },
    {
      id: 3,
      title: 'Movie Night',
      amount: 300,
      category: {
        id: 3,
        name: 'Entertainment',
        description: 'Movies, games',
        icon: 'IconMovie',
        bgColor: '#34D399',
      },
      date: new Date(
        new Date().setDate(new Date().getDate() - 5),
      ).toISOString(),
      payer: 3,
      splits: [],
      items: [],
      createdAt: Date.now().toString(),
    },
  ],
  loading: false,
  error: null,

  addExpense: async (data) => {
    set({ loading: true, error: null });

    try {
      const res = await PRIVATE_REQUEST.post('/expense', data);
      const newExpense: ExpensesDetails = res.data;

      set((state) => ({
        expenses: [...state.expenses, newExpense],
        loading: false,
      }));
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
      set({ expenses, loading: false });
    } catch (error) {
      const message = (error as string) || 'Failed to fetch expenses';
      set({ error: message, loading: false });
    }
  },

  getChartExpenses: async () => {
    set({ loading: true, error: null });

    try {
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

      const res = await PRIVATE_REQUEST.get('/expense');
      const data: ExpensesDetails[] = res.data;

      const filtered = data.filter((item) => {
        const expenseDate = new Date(item.date);
        return expenseDate >= oneMonthAgo;
      });

      set({
        chartExpenses: filtered,
        loading: false,
      });
    } catch (error) {
      const message = (error as string) || 'Failed to fetch chart data';
      set({ error: message, loading: false });
    }
  },
}));
