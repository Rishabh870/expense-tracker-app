import { useAuthStore } from '@/app/store/useAuthStore';
import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { SafeAreaView } from 'react-native';

export default function SettingScreen() {
  const { logout } = useAuthStore();

  return (
    <SafeAreaView>
      <Button onPress={logout}>
        <ButtonText>Logout</ButtonText>
      </Button>
    </SafeAreaView>
  );
}
