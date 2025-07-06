// screens/HomeScreen.tsx

import { useAuthStore } from '../../store/useAuthStore';
import { SafeAreaView, View } from 'react-native';
import { ExpenseChart } from '@/app/components/common/ExpenseChart';
import { useTransactions } from '@/app/hooks/useTransactionHook';
import { Heading } from '@/components/ui/heading';
import { TransactionList } from '@/app/components/common/ExpenseList';
import BalanceCard from '@/app/components/common/BalanceCard';

export default function HomeScreen() {
  const { logout } = useAuthStore();
  const { loading, grouped, unbilled } = useTransactions();

  return (
    <SafeAreaView>
      <BalanceCard balance={2548} income={1840} expenses={284} />

      <Heading size='sm' className='text-gray-500 mb-2 ml-2 px-3'>
        Expenses
      </Heading>
      <TransactionList grouped={grouped} />
    </SafeAreaView>
  );
}
