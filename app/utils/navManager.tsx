import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/main/HomeScreen';
import SettingsScreen from '../screens/main/SettingScreen';
import { ExpenseScreen } from '../screens/main/ExpenseScreen';
import SettlementScreen from '../screens/main/SettlementScreen';
import { AppBar } from '../components/common/appbar';
import { Navbar } from '../components/common/navbar';

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
      <Tab.Screen name='Expense' component={ExpenseScreen} />
      <Tab.Screen name='Settlement' component={SettlementScreen} />
      <Tab.Screen name='Settings' component={SettingsScreen} />
    </Tab.Navigator>
  );
}
