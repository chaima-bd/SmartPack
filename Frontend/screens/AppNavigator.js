// AppNavigator.js
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import CartScreen from './CartScreen';
import ChooseImage from './ChooseImage';
const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Scan" component={ChooseImage} />
    </Tab.Navigator>
  );
};

export default AppNavigator;
