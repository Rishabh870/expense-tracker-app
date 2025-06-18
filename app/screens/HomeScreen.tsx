// screens/HomeScreen.tsx

import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { useAppStore } from '../store/useAppStore';

export default function HomeScreen() {
  const items = useAppStore((state) => state.items);

  return (
    <Box>
      {items.map((item) => (
        <Box key={item.id}>
          <Text size='lg'>{item.title}</Text>
          <Text size='md'>₹{item.amount}</Text>
        </Box>
      ))}
    </Box>
  );
}
