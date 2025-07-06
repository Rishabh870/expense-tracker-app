import '@/global.css';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';

import { NavigationContainer } from '@react-navigation/native';
import NavManager from './app/utils/navManager';
import { ActivityIndicator, SafeAreaView, View } from 'react-native';
import { DialogManager } from './app/utils/dialogManager';
import AuthStack from './app/utils/authManager';
import { useAuthStore } from './app/store/useAuthStore';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ScreenStack from './app/utils/screenManager';
import RootStackNavigator from './app/RootScreenManager';

export default function App() {
  const { user, hasHydrated, loadUserFromStorage } = useAuthStore();

  useEffect(() => {
    loadUserFromStorage();
  }, []);

  // if (!hasHydrated) {
  //   return (
  //     <View className='flex-1 justify-center items-center bg-white'>
  //       <ActivityIndicator size='large' color='#1e40af' />
  //     </View>
  //   );
  // }
  return (
    <GluestackUIProvider mode='light'>
      <SafeAreaProvider>
        <NavigationContainer>
          <RootStackNavigator />
          <DialogManager />
        </NavigationContainer>
      </SafeAreaProvider>
    </GluestackUIProvider>
  );
}
