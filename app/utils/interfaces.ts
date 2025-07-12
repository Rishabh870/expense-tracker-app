// types/interfaces.ts

import type {
  SplitPerson,
  Categories,
  ExpenseItems,
  ExpensesDetails,
  SettlementEntry,
  Direction,
} from './types';

export interface User {
  id: number;
  username: string;
  name?: string | null;
  email?: string | null;
  mobile_number?: string | null;
  password: string;
}

export interface SplitUser extends SplitPerson {
  parent_user_id: number;
}

export interface Category extends Categories {
  user_id: number;
}

export interface ExpenseItem extends ExpenseItems {
  user_id?: number | null;
  payer_id?: number | null;
  expense_id?: number | null;
  created_at: string;
}

export interface SplitDetail {
  id: number;
  expense_id: number;
  person_id: number;
  amount: number;
  paid: number;
}

export interface ItemSplit {
  id: number;
  item_id: number;
  person_id: number;
  amount: number;
}

export interface Expense extends ExpensesDetails {
  user_id: number;
  payer_id?: number | null;
  category_id?: number | null;
  created_at: string;
  is_split: boolean;
}

export interface Settlement extends SettlementEntry {
  user_id: number;
  other_person_id: number;
  direction: Direction;
}
