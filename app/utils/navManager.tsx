import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AppBar } from '../components/common/AppBar';
import HomeScreen from '../screens/main/HomeScreen';
import SettingsScreen from '../screens/main/SettingScreen';
import { TransactionsScreen } from '../screens/main/TransactionsScreen';
import ExpenseScreen from '../screens/main/ExpenseScreen';
import { Navbar } from '../components/common/NavBar';

const Tab = createBottomTabNavigator();

export default function NavManager() {
  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={({ route }) => ({
        header: () => <AppBar routeName={route.name} />,
      })}
      tabBar={(props) => <Navbar {...props} />}>
      <Tab.Screen name='Home' component={HomeScreen} />
      <Tab.Screen name='Transactions' component={TransactionsScreen} />
      <Tab.Screen name='Expense' component={ExpenseScreen} />
      <Tab.Screen name='Settings' component={SettingsScreen} />
    </Tab.Navigator>
  );
}
