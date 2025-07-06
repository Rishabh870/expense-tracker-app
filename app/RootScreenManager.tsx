import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './utils/types';
import AuthStack from './utils/authManager';
import NavManager from './utils/navManager';
import ScreenStack from './utils/screenManager';
import { useAuthStore } from './store/useAuthStore';
import { useEffect } from 'react';

const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function RootStackNavigator() {
  const { user, hasHydrated, loadUserFromStorage } = useAuthStore();

  useEffect(() => {
    loadUserFromStorage();
  }, []);

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <>
          <RootStack.Screen name='MainTabs' component={NavManager} />
          <RootStack.Screen name='Add' component={ScreenStack} />
        </>
      ) : (
        <RootStack.Screen name='Auth' component={AuthStack} />
      )}
    </RootStack.Navigator>
  );
}
