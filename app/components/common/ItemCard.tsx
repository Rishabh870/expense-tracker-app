import { ExpenseItems } from '@/app/utils/types';
import { Box } from '@/components/ui/box';
import { HStack } from '@/components/ui/hstack';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { AvatarFromName } from '../ui/Avatar';
import { IconEdit, IconTrash } from '@tabler/icons-react-native';
import AvatarStack from './AvatarStack';

interface ItemCardProps {
  item: ExpenseItems;
}

const handleEdit = () => {};
const handleDelete = () => {};

const ItemCard = ({ item }: ItemCardProps) => {
  return (
    <View className='bg-white rounded-2xl p-4 shadow-md mb-3 border border-gray-100'>
      <View className='flex-row items-center space-x-2'>
        <View style={{ width: '30%' }}>
          <Text
            numberOfLines={1}
            ellipsizeMode='tail'
            className='text-base font-semibold text-gray-800 '>
            {item.name}
          </Text>
        </View>

        {/* Quantity / Size (2/10) */}
        <View style={{ width: '15%' }}>
          <Text className='text-sm text-gray-500 '>
            Qty: {item.quantity ?? 1} {item.size ? `(${item.size})` : ''}{' '}
            {item.measurement ?? ''}
          </Text>
        </View>

        {/* Assigned Avatars (2/10) */}
        <View
          style={{
            width: '20%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {item.assigned_to?.length ? (
            // <HStack className='relative mb-5'>
            //   {item.assigned_to.map((person, index) => (
            //     <Box
            //       key={person.id}
            //       className='p-0 m-0'
            //       style={{
            //         position: 'absolute',
            //         left: index * 12,
            //         zIndex: item.assigned_to!.length - index,
            //       }}>
            //       <AvatarFromName name={person.name} size={20} textSize={8} />
            //     </Box>
            //   ))}
            // </HStack>
            <AvatarStack people={item.assigned_to} limit={4} />
          ) : null}
        </View>

        {/* Amount + Actions (2/10) */}
        <View
          style={{ width: '15%' }}
          className='flex-row items-center justify-end space-x-2'>
          <Text className='text-base font-bold text-green-600'>
            ₹{item.amount}
          </Text>
        </View>
        {/* Amount + Actions (2/10) */}
        <View
          style={{ width: '20%' }}
          className='flex-row items-center justify-end space-x-2'>
          <TouchableOpacity className='mr-3' onPress={handleEdit}>
            <IconEdit size={18} color='#888' />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleDelete}>
            <IconTrash size={18} color='#f87171' />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ItemCard;
