import { create } from 'zustand';
import { expenses as ExpenseDetailData } from '../data/expenseDetailsData';
import { ExpensesDetails } from '../utils/types';
// import { PRIVATE_REQUEST } from '../utils/requestMethods'; // for future API integration

const PAGE_LIMIT = 10;

interface ExpenseDetailStore {
  expenses: ExpensesDetails[];
  expenseById: Record<number, ExpensesDetails>; // id-based store
  expensesByPerson: Record<number, ExpensesDetails[]>; // personId -> expenses[]
  expensesByCategory: Record<number, ExpensesDetails[]>; // categoryId -> expenses[]

  page: number;
  hasMore: boolean;
  loading: boolean;

  load: () => void;
  getExpenseById: (id: number) => ExpensesDetails | undefined;
  fetchExpenseById: (id: number) => void;
  getExpensesByPerson: (personId: number) => ExpensesDetails[];
  fetchExpensesByPerson: (personId: number) => void;
  getExpensesByCategory: (categoryId: number) => ExpensesDetails[];
  fetchExpensesByCategory: (categoryId: number) => void;
}

export const useExpenseDetailStore = create<ExpenseDetailStore>((set, get) => ({
  expenses: [],
  expenseById: {},
  expensesByPerson: {},
  page: 1,
  hasMore: true,
  loading: false,
  expensesByCategory: {},

  getExpensesByCategory: (categoryId) => {
    return get().expensesByCategory[categoryId] || [];
  },

  fetchExpensesByCategory: (categoryId) => {
    // Replace with future API call if needed
    const fullData = ExpenseDetailData;

    const filtered = fullData.filter((exp) => exp.category?.id === categoryId);

    set((state) => ({
      expensesByCategory: {
        ...state.expensesByCategory,
        [categoryId]: filtered,
      },
    }));
  },

  load: () => {
    const { page, expenses } = get();
    set({ loading: true });

    const start = (page - 1) * PAGE_LIMIT;
    const end = start + PAGE_LIMIT;
    const fullData = ExpenseDetailData;
    const data = fullData.slice(start, end);

    const idMap: Record<number, ExpensesDetails> = {};
    data.forEach((exp) => {
      idMap[exp.id] = exp;
    });

    set({
      expenses: [...expenses, ...data],
      expenseById: { ...get().expenseById, ...idMap },
      page: page + 1,
      hasMore: end < fullData.length,
      loading: false,
    });
  },

  getExpenseById: (id) => {
    return get().expenseById[id];
  },

  fetchExpenseById: (id) => {
    //     const res = await PRIVATE_REQUEST.get(`/expenses/${id}`);
    // const match = res.data as ExpensesDetails;

    const fullData = ExpenseDetailData; // Replace with API request in future
    const match = fullData.find((exp) => exp.id === id);
    if (match) {
      set((state) => ({
        expenseById: { ...state.expenseById, [id]: match },
      }));
    }
  },

  getExpensesByPerson: (personId) => {
    return get().expensesByPerson[personId] || [];
  },

  fetchExpensesByPerson: (personId) => {
    //    const res = await PRIVATE_REQUEST.get(`/expenses?personId=${personId}`);
    // const filtered = res.data as ExpensesDetails[];

    const fullData = ExpenseDetailData; // Replace with API call in future

    const filtered = fullData.filter((exp) =>
      exp.splits.some((p) => Number(p.id) === Number(personId)),
    );

    set((state) => ({
      expensesByPerson: {
        ...state.expensesByPerson,
        [personId]: filtered,
      },
    }));
  },
}));
