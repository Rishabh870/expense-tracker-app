import '@/global.css';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';

import { NavigationContainer } from '@react-navigation/native';
import RootLayout from './app/rootLayout';
import { View } from 'react-native';
import { DialogManager } from './app/utils/dialogManager';

export default function App() {
  return (
    <GluestackUIProvider mode='light'>
      <View className='h-full w-full'>
        <NavigationContainer>
          <RootLayout />
          <DialogManager />
        </NavigationContainer>
      </View>
    </GluestackUIProvider>
  );
}
