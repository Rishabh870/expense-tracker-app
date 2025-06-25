import { Card } from '@/components/ui/card';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Box } from '@/components/ui/box';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Icon, MailIcon } from '@/components/ui/icon';
import * as TablerIcon from '@tabler/icons-react-native';

interface Props {
  icon: keyof typeof TablerIcon;
  iconBg: string;
  category: string;
  description: string;
  amount: number;
}

export const CategoryCard = ({
  icon,
  iconBg,
  category,
  description,
  amount,
}: Props) => {
  const DynamicIcon = TablerIcon[
    icon as keyof typeof TablerIcon
  ] as React.ComponentType<any>;

  return (
    <Card size='md' variant='filled' className='mx-3 my-2 px-3 py-3 rounded-lg'>
      <HStack space='md' className='text-center items-center'>
        {/* Left: Icon */}
        <Box
          className='w-12 h-12 rounded-md items-center justify-center'
          style={{ backgroundColor: iconBg }}>
          <DynamicIcon size={24} color='#fff' />
        </Box>

        {/* Middle: Text Info */}
        <VStack className='flex-1 ml-3'>
          <Heading size='sm' className='mb-0.5'>
            {category}
          </Heading>
          <Text size='xs' className='text-muted-500'>
            {description}
          </Text>
        </VStack>

        {/* Right: Amount */}
        <Text size='sm' bold className='text-textDark-900'>
          ₹{amount}
        </Text>
      </HStack>
    </Card>
  );
};
