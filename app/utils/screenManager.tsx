import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AddExpense } from '../screens/add/AddExpense';

const Stack = createNativeStackNavigator();

export default function ScreenStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='AddExpense' component={AddExpense} />
    </Stack.Navigator>
  );
}
