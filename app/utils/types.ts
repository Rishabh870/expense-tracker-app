export type SplitPerson = {
  id: number;
  name: string;
  email: string;
  phone: string;
  bgColor: string;
  created_at: string; // ISO datetime string
};

export type Categories = {
  id: number;
  name: string;
  description: string | '';
  icon: string | '';
  bgColor: string | '';
};

export type ExpenseItems = {
  id: number;
  name: string;
  amount: number;
  quantity: number;
  assigned_to: SplitPerson[];
};
// Dummy expense data
export type ExpensesDetails = {
  id: number;
  title: string;
  amount: number;
  category: Categories;
  date: string;
  splits: {
    person: number;
    amount: string;
    paid: string;
  }[];
  payer: number;
  items: ExpenseItems[];
};
