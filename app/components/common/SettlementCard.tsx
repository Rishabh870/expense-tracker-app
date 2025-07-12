import { Card } from '@/components/ui/card';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Box } from '@/components/ui/box';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { colors } from '@/app/constants/theme';
import { View } from 'react-native';
import {
  IconTrendingUp,
  IconTrendingDown,
  IconDownload,
  IconBrandWhatsapp,
} from '@tabler/icons-react-native';
import { AvatarFromName } from '../ui/Avatar';

interface Props {
  name: string;
  phone: string;
  amount: number;
  type: string;
}

const handleDownload = () => {
  console.log('Downloading');
};
const handleShare = () => {
  console.log('Sharing');
};

export const SettlementCard = ({ name, phone, amount, type }: Props) => {
  const amountColor = type === 'receive' ? '#10B981' : '#EF4444';
  const label = ` ₹${amount}`;

  return (
    <Card
      size='lg'
      variant='filled'
      style={{ backgroundColor: colors.cardbackground }}
      className='my-2 px-3 py-3 rounded'>
      <HStack space='lg' className='items-center justify-evenly'>
        {/* Avatar Circle */}
        <AvatarFromName name={name} />

        {/* Name & Phone */}
        <VStack className='flex-1'>
          <Heading size='lg' className='mb-1.5'>
            {name}
          </Heading>
          <Text size='sm' className='text-muted-500 text-gray-500'>
            {phone}
          </Text>
        </VStack>

        {/* Amount Info */}
        <View className='items-end mr-3'>
          <Text
            className=' justify-center items-center text-center'
            size='lg'
            bold
            style={{ color: amountColor }}>
            {type == 'receive' ? (
              <IconTrendingUp size={15} color={amountColor} />
            ) : (
              <IconTrendingDown size={15} color={amountColor} />
            )}
            {label}
          </Text>

          {/* Action Icons */}
          <HStack space='md' className='mt-2'>
            <IconDownload onPress={handleDownload} size={18} color='#999' />
            <IconBrandWhatsapp onPress={handleShare} size={18} color='#999' />
            {/* < size={18} color='#999' /> */}
          </HStack>
        </View>
      </HStack>
    </Card>
  );
};
