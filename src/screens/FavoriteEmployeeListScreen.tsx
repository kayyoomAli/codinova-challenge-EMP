// screens/FavoriteEmployeeListScreen.tsx
import React, {useEffect} from 'react';
import {View, Text, FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EmployeeCard from '../components/EmployeeCard';
import {Employee} from '../utils/types';
const FavoriteEmployeeListScreen: React.FC = () => {
  const [favoriteEmployees, setFavoriteEmployees] = React.useState<Employee[]>(
    [],
  );

  useEffect(() => {
    loadFavoriteEmployees();
  }, []);

  const loadFavoriteEmployees = async () => {
    try {
      const storedEmployees = await AsyncStorage.getItem('employees');
      console.log('storedEmployees', storedEmployees);

      if (storedEmployees) {
        const allEmployees = JSON.parse(storedEmployees);
        const favorites = allEmployees.filter(
          (employee: Employee) => employee.isFavorite,
        );
        console.log('favorites', favorites);

        setFavoriteEmployees(favorites);
      }
    } catch (error) {
      console.error('Error loading favorite employees:', error);
    }
  };

  const renderNoFavorites = () => {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>No favorite employees found</Text>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      {favoriteEmployees.length === 0 ? (
        renderNoFavorites()
      ) : (
        <FlatList
          data={favoriteEmployees}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => <EmployeeCard employee={item} />}
        />
      )}
    </View>
  );
};

export default FavoriteEmployeeListScreen;
