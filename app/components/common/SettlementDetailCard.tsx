import React from 'react';
import { Text } from '@/components/ui/text';
import { Card } from '@/components/ui/card';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';

import { ExpensesDetails } from '@/app/utils/types';
import { AvatarFromName } from '../ui/Avatar';
import { Accordion } from '../ui/Accordion';
import { Box } from '@/components/ui/box';
import AvatarStack from './AvatarStack';

interface Props {
  data: ExpensesDetails;
  isBilled: boolean;
}

export const SettlementDetailCard = ({ data, isBilled = false }: Props) => {
  const textColor = isBilled ? 'text-green-600' : 'text-red-600';
  return (
    <Card className='p-4 my-2 rounded-2xl bg-white shadow-sm'>
      {/* Top Section */}
      <HStack className='justify-between items-center mb-2'>
        {/* Left: Category and Title */}
        <VStack className='flex-1 mr-2'>
          <Text className='text-base font-semibold text-gray-800'>
            {data.title}
          </Text>
          <Text className='text-sm text-muted-500'>{data.category?.name}</Text>
        </VStack>

        {/* Right: Amount */}
        <Text className={`text-lg font-bold ${textColor}  `}>
          ₹{data.amount}
        </Text>
      </HStack>

      {/* Avatars for Splits */}
      <AvatarStack people={data.splits} limit={4} />

      {/* Accordion */}
      <Accordion title='Items'>
        <VStack className='space-y-1 mb-1'>
          {data.items.map((item, index) => (
            <HStack
              key={index}
              className='justify-between bg-gray-100 rounded-lg px-3 py-2 mb-2'>
              <Text className='text-sm text-gray-800'>{item.name}</Text>
              <Text className='text-sm text-gray-700'>₹{item.amount}</Text>
            </HStack>
          ))}
        </VStack>
      </Accordion>
    </Card>
  );
};
