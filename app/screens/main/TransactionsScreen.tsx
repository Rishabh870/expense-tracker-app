import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { CategoryCard } from '../../components/common/CategoryCard';
import * as TablerIcon from '@tabler/icons-react-native';
import { VStack } from '@/components/ui/vstack';
import { Heading } from '@/components/ui/heading';
import { formatDate } from '../../utils/dateFormat';
import { useTransactions } from '../../hooks/useTransactionHook';
import SegmentTabs from '../../components/common/SegmentTabs';

export const TransactionsScreen = () => {
  const { loading, grouped, unbilled } = useTransactions();
  const [activeTab, setActiveTab] = useState<'transactions' | 'unbilled'>(
    'unbilled',
  );
  const tabs = [
    { key: 'unbilled', label: 'Unbilled Transactions' },
    { key: 'transactions', label: 'Transactions' },
  ];
  return (
    <View className='flex-1 bg-white'>
      <SegmentTabs
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={(key) => setActiveTab(key as 'transactions' | 'unbilled')}
      />
      <ScrollView style={{ flex: 1 }} className='bg-white'>
        {activeTab === 'transactions' ? (
          // transaction screen
          Object.entries(grouped)
            .sort(([a], [b]) => b.localeCompare(a)) // latest date first
            .map(([date, items]) => (
              <VStack key={date} className='px-3 py-2'>
                <Heading size='sm' className='text-gray-500 mb-2 ml-2'>
                  {formatDate(date)}
                </Heading>
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
            ))
        ) : (
          // unbilled transaction screen
          <VStack className='mt-2 space-y-3'>
            {unbilled.map((item) => (
              <CategoryCard
                key={item.id}
                category={item.category}
                description={item.description}
                icon={item.icon as any}
                iconBg={item.iconBg}
                amount={item.amount}
                isGiven={item.isGiven}
              />
            ))}
          </VStack>
        )}
      </ScrollView>
    </View>
  );
};
