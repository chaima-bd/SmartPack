// AppNavigator.js
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import CartScreen from './CartScreen';
import ScanScreen from './ScanScreen';
const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Scan" component={ScanScreen} />
    </Tab.Navigator>
  );
};

export default AppNavigator;
