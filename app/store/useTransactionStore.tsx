// store/useTransactionStore.ts

import { create } from 'zustand';
import db from '../data/db.json'; // adjust path as needed

interface Transaction {
  id: string;
  date: string;
  category: any;
  description: string;
  amount: number;
  isGiven: boolean;
  billed?: boolean; // true or false
  icon: string;
  iconBg: string;
}

interface TransactionStore {
  transactions: Transaction[];
  grouped: Record<string, Transaction[]>;
  unbilled: Transaction[];
  load: () => void;
}

export const useTransactionStore = create<TransactionStore>((set) => ({
  transactions: [],
  grouped: {},
  unbilled: [],
  load: () => {
    // fetch or mock your data
    const data: Transaction[] = db.transactions;

    // group by date
    const groupedData: Record<string, Transaction[]> = {};
    const unbilledData: Transaction[] = [];

    for (const tx of data) {
      if (tx.billed === false) {
        unbilledData.push(tx);
      } else {
        const dateKey = tx.date.split('T')[0]; // assume ISO string
        if (!groupedData[dateKey]) groupedData[dateKey] = [];
        groupedData[dateKey].push(tx);
      }
    }

    set({
      transactions: data,
      grouped: groupedData,
      unbilled: unbilledData,
    });
  },
}));
