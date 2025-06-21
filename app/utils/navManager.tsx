import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AppBar } from '../components/common/appbar';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingScreen';
import { TransactionsScreen } from '../screens/TransactionsScreen';
import ExpenseScreen from '../screens/ExpenseScreen';
import { Navbar } from '../components/common/navbar';

const Tab = createBottomTabNavigator();

export default function NavManager() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        header: (props) => <AppBar {...props} routeName={route.name} />,
      })}
      tabBar={(props) => <Navbar {...props} />}>
      <Tab.Screen name='Home' component={HomeScreen} />
      <Tab.Screen name='Transactions' component={TransactionsScreen} />
      <Tab.Screen name='Expense' component={ExpenseScreen} />
      <Tab.Screen name='Settings' component={SettingsScreen} />
    </Tab.Navigator>
  );
}
