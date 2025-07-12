import type { BudgetItem } from "./budget.types.ts";

export type Categories = {
  id: number;
  name: string;
  description: string | "";
  icon: string | "";
  bgColor: string | "";
};

export type CategoryItem = {
  id?: number | 0;
  name: string;
  description: string;
  created_at: Date | null;
  icon: string | null;
  bgColor: string;
  budgets?: BudgetItem | null;
  is_net: boolean | false;
};
