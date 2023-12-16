// components/EmployeeList.tsx
import React from 'react';
import {FlatList, View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import EmployeeCard from './EmployeeCard';
import {Employee} from '../utils/types';

interface EmployeeListProps {
  data: Employee[];
  onFavoriteToggle: (employeeId: number) => void;
}

const EmployeeList: React.FC<EmployeeListProps> = ({
  data,
  onFavoriteToggle,
}) => {
  const renderEmployee = ({item}: {item: Employee}) => {
    return (
      <View style={styles.renderItemList}>
        <EmployeeCard
          employee={item}
          onStarPress={() => onFavoriteToggle(item.id)}
        />
      </View>
    );
  };

  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id.toString()}
      renderItem={renderEmployee}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text>No employees found</Text>
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  renderItemList: {
    marginHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 10,
  },
});

export default EmployeeList;
