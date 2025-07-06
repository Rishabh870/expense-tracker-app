import React from 'react';
import { ScrollView } from 'react-native';
import * as TablerIcon from '@tabler/icons-react-native';
import { VStack } from '@/components/ui/vstack';
import { CategoryCard } from './CategoryCard';

type TransactionItem = {
  id: string;
  category: string;
  description: string;
  icon: string;
  iconBg: string;
  amount: number;
  isGiven: boolean;
};

type GroupedTransactions = Record<string, TransactionItem[]>;

interface TransactionListProps {
  grouped: GroupedTransactions;
}

export const TransactionList: React.FC<TransactionListProps> = ({
  grouped,
}) => {
  return (
    <ScrollView>
      {Object.entries(grouped)
        .sort(([a], [b]) => b.localeCompare(a)) // latest date first
        .map(([date, items]) => (
          <VStack key={date} className='px-3 '>
            {/* <Heading size='sm' className='text-gray-500 mb-2 ml-2'>
            //   {formatDate(date)}
            </Heading> */}
            {items.map((item) => (
              <CategoryCard
                key={item.id}
                category={item.category}
                description={item.description}
                icon={item.icon as keyof typeof TablerIcon}
                iconBg={item.iconBg}
                amount={item.amount}
                isGiven={item.isGiven}
              />
            ))}
          </VStack>
        ))}
    </ScrollView>
  );
};
