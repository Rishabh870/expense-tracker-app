import { Card } from '@/components/ui/card';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Box } from '@/components/ui/box';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Icon, MailIcon } from '@/components/ui/icon';
import * as TablerIcon from '@tabler/icons-react-native';
import { colors } from '@/app/constants/theme';

interface Props {
  icon: keyof typeof TablerIcon;
  iconBg: string;
  category: string;
  description: string;
  amount: number;
  isGiven: boolean;
}

export const CategoryCard = ({
  icon,
  iconBg,
  category,
  description,
  amount,
  isGiven,
}: Props) => {
  const DynamicIcon = TablerIcon[
    icon as keyof typeof TablerIcon
  ] as React.ComponentType<any>;

  const amountColor = isGiven ? 'text-red-500' : 'text-green-500';

  return (
    <Card
      size='lg'
      variant='filled'
      style={{ backgroundColor: colors.cardbackground }}
      className=' my-2 px-3 py-3 rounded-2xl'>
      <HStack space='lg' className='text-center items-center justify-evenly'>
        {/* Left: Icon */}
        <Box
          className='w-16 h-16 rounded-2xl items-center justify-center'
          style={{ backgroundColor: iconBg }}>
          <DynamicIcon size={28} color='#fff' />
        </Box>

        {/* Middle: Text Info */}
        <VStack className='flex-1 ml-3'>
          <Heading size='lg' className='mb-1.5'>
            {category}
          </Heading>
          <Text size='sm' className='text-muted-500 text-gray-500'>
            {description}
          </Text>
        </VStack>

        {/* Right: Amount */}
        <Text size='lg' bold className={amountColor}>
          {isGiven ? '-' : '+'} ₹{amount}
        </Text>
      </HStack>
    </Card>
  );
};
