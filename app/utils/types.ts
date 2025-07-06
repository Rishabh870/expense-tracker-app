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

// Root navigator
export type RootStackParamList = {
  MainTabs: MainTabParamList;
  Auth: AuthStackParamList;
  Add: {
    screen: keyof AddStackParamList;
  };
};

// Auth navigator
export type AuthStackParamList = {
  LoginScreen: undefined;
  SignupScreen: undefined;
};

// Main tab navigator
export type MainTabParamList = {
  Home: undefined;
  Transactions: undefined;
  Expense: undefined;
  Settings: undefined;
};
export type AddStackParamList = {
  AddExpense: undefined;
  AddTransactions: undefined;
  AddCategory: undefined;
};
