// components/EmployeeCard.tsx
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import StarButton from './StartButton';
import {Employee} from '../utils/types';

interface EmployeeCardProps {
  employee: Employee;
  onStarPress?: () => void;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({employee, onStarPress}) => {
  const firstNameInitial = employee.firstName.charAt(0).toUpperCase();
  const lastNameInitial = employee.lastName.charAt(0).toUpperCase();
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text
          style={
            styles.firstNLastCharStyle
          }>{`${firstNameInitial}${lastNameInitial}`}</Text>
        <View>
          <Text
            style={
              styles.employeeNameStyle
            }>{`${firstNameInitial}${employee.firstName.slice(
            1,
          )} ${lastNameInitial}${employee.lastName.slice(1)}`}</Text>
          <Text style={{color: 'grey'}}>{employee.jobTitle}</Text>
        </View>
      </View>
      <View style={styles.starContainer}>
        <StarButton isFavorite={employee.isFavorite} onPress={onStarPress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderColor: '#ddd',
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  starContainer: {
    marginLeft: 16,
  },
  firstNLastCharStyle: {
    fontSize: 23,
    backgroundColor: 'green',
    color: 'black',
    padding: 6,
    borderRadius: 50,
    marginRight: 20,
  },
  employeeNameStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default EmployeeCard;
