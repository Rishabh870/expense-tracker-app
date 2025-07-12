export type BudgetItem = {
  id: number;
  title: string;
  amount: number | 0;
  spent: number | 0;

  validFrom: Date;
  validTo: Date;
};
