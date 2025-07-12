import React, { ReactNode, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from '@/components/ui/text';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react-native';

interface AccordionProps {
  title?: string;
  children: ReactNode;
  initiallyOpen?: boolean;
}

export const Accordion = ({
  title = 'Show Items',
  children,
  initiallyOpen = false,
}: AccordionProps) => {
  const [expanded, setExpanded] = useState(initiallyOpen);

  return (
    <View className='mt-2'>
      <TouchableOpacity
        onPress={() => setExpanded(!expanded)}
        className='flex-row justify-between items-center'>
        <Text className='text-sm font-medium text-primary-500'>
          {expanded ? `Hide ${title}` : title}
        </Text>
        {expanded ? (
          <IconChevronUp size={16} color='#6B7280' />
        ) : (
          <IconChevronDown size={16} color='#6B7280' />
        )}
      </TouchableOpacity>

      {expanded && <View className='mt-2'>{children}</View>}
    </View>
  );
};
