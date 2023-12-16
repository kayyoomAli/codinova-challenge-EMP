// navigation/AppNavigator.tsx
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import AddEmployeeScreen from './src/screens/AddEmployeeScreen';
import EmployeeListScreen from './src/screens/EmployeeListScreen';
import SplashScreen from './src/screens/SplashScreen';
import FavoriteEmployeeListScreen from './src/screens/FavoriteEmployeeListScreen';

const Stack = createNativeStackNavigator();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Splash"
          component={SplashScreen}
        />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddEmployee" component={AddEmployeeScreen} />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="EmployeeList"
          component={EmployeeListScreen}
        />
        <Stack.Screen
          name="FavoriteEmployees"
          component={FavoriteEmployeeListScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
