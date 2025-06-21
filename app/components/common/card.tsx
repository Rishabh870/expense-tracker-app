import { Box } from '@/components/ui/box';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { HStack } from '@/components/ui/hstack';
import { AlertCircleIcon, Icon, MailIcon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { StyleSheet } from 'react-native';

type Props = {
  icon: string;
  iconBg: string;
  category: string;
  description: string;
  amount: number;
};

const CategoryCard = ({
  // icon,
  iconBg,
  category,
  description,
  amount,
}: Props) => {
  return (
    <Card size='md' variant='filled'>
      <HStack space='md'>
        {/* Left: Icon */}
        <Box style={[styles.iconBox, { backgroundColor: iconBg }]}>
          <Icon as={MailIcon} size='md' color='#fff' />
        </Box>

        {/* Middle: Text Info */}
        <VStack style={styles.textBlock}>
          <Heading size='sm' style={styles.heading}>
            {category}
          </Heading>
          <Text size='xs' style={styles.subtext}>
            {description}
          </Text>
        </VStack>

        {/* Right: Amount */}
        <Text size='sm' bold style={styles.amount}>
          ₹{amount}
        </Text>
      </HStack>
    </Card>
  );
};

const styles = StyleSheet.create({
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBlock: {
    flex: 1,
    marginLeft: 12,
  },
  heading: {
    marginBottom: 2,
  },
  subtext: {
    color: '#6B7280', // text-muted-500 (gray-500)
  },
  amount: {
    color: '#111827', // textDark-900 (gray-900)
    fontWeight: 'bold',
  },
});

export default CategoryCard;
