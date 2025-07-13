import type { SplitPerson } from "./person.types.ts";
import type { SplitItem } from "./split.types.ts";

export type ExpenseItems = {
  id: number;
  item_name: string;
  amount: number;
  splits: SplitItem[];
  is_split: boolean;
  item_size: number;
  item_measurement: string;
  payer: SplitPerson;
};

export type ExpensesDetails = {
  id: number;
  title: string;
  amount: number;
  category_id: string;
  category: {
    id: number;
    name: string;
    description: string;
    created_at: string;
    icon: string;
    bgColor: string;
  };
  date: string;
  splits: {
    person: SplitPerson[];
    amount: string;
    paid: string;
  }[];
  split_users: { person: string; user: string; amount: string }[];
  is_split: boolean;
  payer: number;
  items: ExpenseItems[];
};

export type GroupedExpenseDetails = {
  date: Date;

  expenses: ExpensesDetails[];
};
