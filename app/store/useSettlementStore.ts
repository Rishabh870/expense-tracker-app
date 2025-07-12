import { create } from 'zustand';
import { PRIVATE_REQUEST } from '../utils/requestMethods';
import { mockSettlementData } from '../data/settlementData';
import { expenses as ExpenseDetailData } from '../data/expenseDetailsData';
import { ExpensesDetails } from '../utils/types';
import { Settlement } from '../utils/interfaces';

interface SettlementStore {
  settlements: Settlement[];
  loading: boolean;
  error: string | null;
  page: number;
  hasMore: boolean;
  fetchSettlements: () => Promise<void>;
  resetSettlements: () => void;
}

const PAGE_SIZE = 10;

export const useSettlementStore = create<SettlementStore>((set, get) => ({
  settlements: [],
  settlementExpenses: [],
  loading: false,
  error: null,
  page: 0,
  hasMore: true,

  fetchSettlements: async () => {
    const { page, settlements, hasMore } = get();
    if (!hasMore) return;

    set({ loading: true, error: null });

    try {
      // const res = await PRIVATE_REQUEST.get(`/settlements?page=${page}`);
      // const newSettlements: Settlement[] = res.data;
      const start = page * PAGE_SIZE;
      const end = start + PAGE_SIZE;

      const newData = mockSettlementData.slice(start, end) as Settlement[];
      const updatedList = [...settlements, ...newData];

      console.log('loading settlements');

      set({
        settlements: updatedList,
        page: page + 1,
        hasMore: end < mockSettlementData.length,
        loading: false,
      });
    } catch (error: any) {
      set({
        error: error.message || 'Failed to fetch settlements',
        loading: false,
      });
    }
  },

  resetSettlements: () => {
    set({
      settlements: [],
      page: 0,
      hasMore: true,
      loading: false,
    });
  },
}));
