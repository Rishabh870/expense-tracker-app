import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AddExpense } from '../screens/add/AddExpense';
import { ExpenseDetails } from '../screens/other/ExpenseDetails';
import { SettlementDetails } from '../screens/other/SettlementDetails';
import { CategoryDetails } from '../screens/other/CategoryDetails';

const Stack = createNativeStackNavigator();

export default function ScreenStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='AddExpense' component={AddExpense} />
      <Stack.Screen name='ExpenseDetails' component={ExpenseDetails} />
      <Stack.Screen name='SettlementDetails' component={SettlementDetails} />
      <Stack.Screen name='CategoryDetails' component={CategoryDetails} />
    </Stack.Navigator>
  );
}
