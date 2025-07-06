// hooks/useTransactions.ts

import { useEffect, useState } from 'react';
import { useTransactionStore } from '../store/useTransactionStore';

export const useTransactions = () => {
  const load = useTransactionStore((s) => s.load);
  const grouped = useTransactionStore((s) => s.grouped);
  const unbilled = useTransactionStore((s) => s.unbilled);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
    setLoading(false);
  }, []);

  return { loading, grouped, unbilled };
};
