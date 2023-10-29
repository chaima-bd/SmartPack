import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Login, Signup, Welcome, ScanScreen, CommandDetails, CartScreen} from "./screens";
import AppNavigator from './screens/AppNavigator';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Welcome'
      >
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="HomeScreen"
          component={AppNavigator} // Use the BottomNavigator as a component
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="ScanScreen"
          component={ScanScreen} 
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="CartScreen"
          component={CartScreen} 
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="CommandDetails"
          component={CommandDetails}
          options={{
            headerShown: false
          }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};