// types/models.ts

export type Direction = 'pay' | 'receive';

export type SplitPerson = {
  id: number;
  name: string;
  email: string;
  phone: string;
  bgColor?: string;
  created_at?: string; // ISO datetime string
  is_self?: boolean;
};

export type Categories = {
  id: number;
  name: string;
  description?: string;
  icon?: string;
  bgColor?: string;
};

export type ExpenseItems = {
  id: number;
  name: string;
  amount: number;
  quantity?: number;
  size?: string;
  measurement?: string;
  assigned_to?: SplitPerson[];
};

export type ExpensesDetails = {
  id: number;
  title: string;
  amount: number;
  category: Categories;
  date: string;
  splits: SplitPerson[];
  payer: number;
  items: ExpenseItems[];
};

export type SettlementEntry = {
  id: number;
  user: SplitPerson;
  other_person: SplitPerson;
  amount: number;
  direction: Direction;
  expense_id: number;
  settled_on?: string;
};

// Root navigator
export type RootStackParamList = {
  MainTabs: MainTabParamList;
  Auth: AuthStackParamList;
  Screens: {
    screen: keyof ScreensStackParamList;
    params?: ScreensStackParamList[keyof ScreensStackParamList];
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

export type ScreensStackParamList = {
  AddExpense: undefined;
  AddTransactions: undefined;
  AddCategory: undefined;
  ExpenseDetails: {
    name?: string;
    description?: string | '';
    icon?: string | '';
    bgColor?: string | '';
    amount?: number;
    categoryName: string;
    type?: string;
    id: number;
  };
  SettlementDetails: {
    name?: string;
    number?: string;
    id: number;
    expense_Id: number;
  };
  CategoryDetails: {
    name?: string;
    number?: string;
    id: number;
    description?: string | '';
    icon?: string | '';
    bgColor?: string | '';
  };
};
