// screens/HomeScreen.tsx
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import CustomButton from '../components/CustomButton';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<any>();

  console.log("....")
  const navigateToEmployeeList = () => {
    navigation.navigate('EmployeeList');
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', marginHorizontal: 10}}>
      <CustomButton onPress={navigateToEmployeeList} label={'Add Employee'} />
    </View>
    
  );
};

export default HomeScreen;
