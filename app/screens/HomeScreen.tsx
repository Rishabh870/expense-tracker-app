// screens/HomeScreen.tsx

import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { useAuthStore } from '../store/useAuthStore';
import { SafeAreaView } from 'react-native';

export default function HomeScreen() {
  const { logout } = useAuthStore();

  return (
    <SafeAreaView className='w-1/4'>
      <Button onPress={logout}>
        <ButtonText>Logout</ButtonText>
      </Button>
    </SafeAreaView>
  );
}
