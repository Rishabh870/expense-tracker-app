import { Card } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import React from 'react';
import { Text, View } from 'react-native';
import {
  IconTrendingUp,
  IconTrendingDown,
  IconChevronUp,
  IconDotsVertical,
} from '@tabler/icons-react-native';
import { colors } from '@/app/constants/theme';

interface BalanceCardProps {
  balance: number;
  income: number;
  expenses: number;
}

const BalanceCard: React.FC<BalanceCardProps> = ({
  balance,
  income,
  expenses,
}) => {
  return (
    <Card
      style={{ backgroundColor: colors.primary }}
      className=' rounded-2xl mx-4 my-4 p-2'>
      {/* Top Row */}
      <View className='flex-row justify-between items-center mt-6 mb-2 mx-5'>
        <View className='flex-row items-center'>
          <Text className='text-white font-bold text-xl mr-2'>
            Total Balance
          </Text>
          <IconChevronUp
            size={20}
            className='opacity-80'
            color={colors.textSecondary}
          />
        </View>
        <IconDotsVertical
          size={20}
          className='opacity-80'
          color={colors.textSecondary}
        />
      </View>

      {/* Balance */}
      <Text className='text-white text-3xl font-bold mb-8 ml-5'>
        ₹{balance.toFixed(2)}
      </Text>

      {/* Income & Expense Box */}
      <View
        className='rounded-2xl mx-2 pb-7 px-3 '
        style={{ backgroundColor: colors.primary }}>
        <View className='flex-row items-center mb-2'>
          <IconTrendingUp
            size={20}
            className='opacity-80'
            color={colors.textSecondary}
          />
          <Text
            style={{ color: colors.textSecondary }}
            className='opacity-80 text-lg font-bold flex-1 ml-1'>
            Income
          </Text>
          <IconTrendingDown
            size={20}
            className='opacity-80'
            color={colors.textSecondary}
          />
          <Text
            style={{ color: colors.textSecondary }}
            className='opacity-80 text-lg font-bold ml-1'>
            Expenses
          </Text>
        </View>

        <View className='flex-row justify-between'>
          <Text
            style={{ color: colors.textPrimary }}
            className='text-xl font-bold flex-1'>
            ₹{income.toFixed(2)}
          </Text>
          <Text
            style={{ color: colors.textPrimary }}
            className=' text-xl font-bold text-right flex-1'>
            ₹{expenses.toFixed(2)}
          </Text>
        </View>
      </View>
    </Card>
  );
};

export default BalanceCard;
