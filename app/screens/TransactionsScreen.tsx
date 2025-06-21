import React from 'react';
import { ScrollView } from 'react-native';
import CategoryCard from '../components/common/card';

const transactionData = [
  {
    id: '1',
    category: 'Groceries',
    description: 'Bought fruits and vegetables',
    icon: 'cart',
    iconBg: '#60A5FA',
    amount: 1200,
  },
  {
    id: '2',
    category: 'Dining',
    description: 'Lunch with friends',
    icon: 'restaurant',
    iconBg: '#F472B6',
    amount: 900,
  },
  // Add more as needed
];

export const TransactionsScreen = () => {
  return (
    <ScrollView style={{ flex: 1 }}>
      {transactionData.map((item) => (
        <CategoryCard
          key={item.id}
          category={item.category}
          description={item.description}
          icon={item.icon}
          iconBg={item.iconBg}
          amount={item.amount}
        />
      ))}
    </ScrollView>
  );
};
