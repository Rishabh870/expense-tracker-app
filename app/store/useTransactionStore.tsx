// store/usetransactionStore.ts

import { create } from 'zustand';
import { expenses as ExpenseDetailData } from '../data/expenseDetailsData';
import { Categories } from '../utils/types';
import { PRIVATE_REQUEST } from '../utils/requestMethods';

export interface transaction {
  id: number;
  title: string;
  date: string;
  category: Categories;
  amount: number;
  billed?: boolean;
}

interface transactionStore {
  transactions: transaction[];
  grouped: Record<string, transaction[]>;
  unbilled: transaction[];
  page: number;
  hasMore: boolean;
  loading: boolean;
  load: () => void;
  loadMore: () => void;
  reset: () => void;
}

const PAGE_LIMIT = 10;

export const usetransactionStore = create<transactionStore>((set, get) => ({
  transactions: [],
  grouped: {},
  unbilled: [],
  page: 1,
  hasMore: true,
  loading: false,
  load: () => {
    const { page, transactions } = get();
    set({ loading: true });
    // fetch or mock your data
    try {
      // const res = await PRIVATE_REQUEST.get(`/transactions?page=${page}&limit=${PAGE_LIMIT}`);
      // const data: Transaction[] = res.data;

      const start = (page - 1) * PAGE_LIMIT;
      const end = start + PAGE_LIMIT;

      const fullData: transaction[] = ExpenseDetailData;
      const data = fullData.slice(start, end);

      const hasMore = end < data.length;

      const newGrouped = { ...get().grouped };
      const newUnbilled = [...get().unbilled];

      for (const tx of data) {
        const dateKey = tx.date.split('T')[0] || tx.date.split(' ')[0]; // handles both formats

        if (tx.billed === false) {
          newUnbilled.push(tx);
        } else {
          if (!newGrouped[dateKey]) newGrouped[dateKey] = [];
          newGrouped[dateKey].push(tx);
        }
      }

      set({
        transactions: [...transactions, ...data],
        grouped: newGrouped,
        unbilled: newUnbilled,
        page: page + 1,
        hasMore,
        loading: false,
      });
    } catch (error) {
      console.error('Failed to load transactions:', error);
      set({ loading: false });
    }
  },
  reset() {
    set({
      transactions: [],
      grouped: {},
      unbilled: [],
      page: 1,
      hasMore: true,
    });
  },
  loadMore: async () => {
    const { hasMore, loading } = get();
    if (loading || !hasMore) {
      return;
    }
    await get().load();
  },
}));

const groupByDate = (data: transaction[]) => {
  return data.reduce((acc, tx) => {
    const dateKey = tx.date.split('T')[0];
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(tx);
    return acc;
  }, {} as Record<string, transaction[]>);
};
