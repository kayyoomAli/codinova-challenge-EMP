// screens/SplashScreen.tsx
import React, {useEffect} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation<any>();
  useEffect(() => {
    const checkForEmployees = async () => {
      try {
        const storedEmployees = await AsyncStorage.getItem('employees');
        const hasEmployees = !!storedEmployees;
        setTimeout(() => {
          if (hasEmployees) {
            navigation.replace('EmployeeList');
          } else {
            navigation.replace('Home');
          }
        }, 1000);
      } catch (error) {
        console.error('Error checking for employees:', error);
      }
    };

    checkForEmployees();
  }, [navigation]);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>WelCome To Employee Management App</Text>
      <ActivityIndicator size="large" color="blue" />
    </View>
  );
};

export default SplashScreen;
