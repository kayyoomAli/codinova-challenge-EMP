import React from 'react';
import {View, TouchableOpacity, Text, Alert} from 'react-native';
import TextInputWithLabel from '../components/TextInputWithLabel';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../components/CustomButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const AddEmployeeScreen: React.FC = ({navigation}: any) => {
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [jobTitle, setJobTitle] = React.useState('');
  const [salary, setSalary] = React.useState('');

  const saveEmployee = async () => {
    if (!firstName || !lastName || !email || !jobTitle || !salary) {
      Alert.alert('Error', 'All fields are required');
      return;
    }

    try {
      // Load existing employees from AsyncStorage
      const existingEmployees = await AsyncStorage.getItem('employees');
      const parsedExistingEmployees = existingEmployees
        ? JSON.parse(existingEmployees)
        : [];

      // Create a new employee object
      const newEmployee = {
        id: parsedExistingEmployees.length + 1,
        firstName,
        lastName,
        email,
        jobTitle,
        salary,
        isFavorite: false,
      };

      // Update the list of employees with the new employee
      const updatedEmployees = [...parsedExistingEmployees, newEmployee];

      // Save the updated list of employees back to AsyncStorage
      await AsyncStorage.setItem('employees', JSON.stringify(updatedEmployees));
      navigation.navigate('EmployeeList');
      // Optionally, you can navigate back to the Employee List screen or perform any other action
    } catch (error) {
      console.error('Error saving employee:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  return (
    <View style={{flex: 1, padding: 16}}>
      <Text
        style={{
          textAlign: 'center',
          color: 'green',
          fontSize: 18,
          fontWeight: '800',
        }}>
        Enter employee details
      </Text>
        <KeyboardAwareScrollView
        extraHeight={30}
        automaticallyAdjustContentInsets={true}
        enableAutomaticScroll={true}
        keyboardShouldPersistTaps={'handled'}
        showsVerticalScrollIndicator={false}>
      <TextInputWithLabel
        label="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInputWithLabel
        label="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInputWithLabel label="Email" value={email} onChangeText={setEmail} />
      <TextInputWithLabel
        label="Job Title"
        value={jobTitle}
        onChangeText={setJobTitle}
      />
      <TextInputWithLabel
        label="Salary"
        value={salary}
        onChangeText={setSalary}
      />

      <CustomButton onPress={saveEmployee} label={'Save'} />
           </KeyboardAwareScrollView>
    </View>
  );
};

export default AddEmployeeScreen;
