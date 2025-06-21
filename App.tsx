import '@/global.css';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';

import { NavigationContainer } from '@react-navigation/native';
import NavManager from './app/utils/navManager';
import { View } from 'react-native';
import { DialogManager } from './app/utils/dialogManager';
import AuthStack from './app/utils/authManager';
import { useAuthStore } from './app/store/useAuthStore';

export default function App() {
  const { user } = useAuthStore();
  return (
    <GluestackUIProvider mode='light'>
      <View className='h-full w-full'>
        <NavigationContainer>
          {user ? <NavManager /> : <AuthStack />}
          {/* <NavManager /> */}
          <DialogManager />
        </NavigationContainer>
      </View>
    </GluestackUIProvider>
  );
}
