import React, {useCallback, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  LayoutAnimation,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FabButton from '../components/FabButton';
import EmployeeList from '../components/EmployeeList';
import {useFocusEffect} from '@react-navigation/native';
import {Employee} from '../utils/types';
import CustomButton from '../components/CustomButton';
import SettingsModal from '../components/SettingsModal';

const EmployeeListScreen: React.FC<{navigation: any}> = ({navigation}) => {
  const [employees, setEmployees] = React.useState<Employee[]>([]);
  const [sortedBy, setSortedBy] = React.useState<
    'firstName' | 'lastName' | null
  >(null);
  const [showDrawer, setShowDrawer] = React.useState(false);
  const [showSettingsModal, setShowSettingsModal] = React.useState(false);

  const loadEmployees = async () => {
    try {
      const storedEmployees = await AsyncStorage.getItem('employees');
      if (storedEmployees) {
        setEmployees(JSON.parse(storedEmployees));
      }
    } catch (error) {
      console.error('Error loading employees:', error);
    }
  };

  // Use useFocusEffect to reload employees when the screen is focused
  useFocusEffect(
    useCallback(() => {
      loadEmployees();
    }, []),
  );

  const renderNoEmployees = () => {
    return (
      <View style={{flex: 1, justifyContent: 'center', marginHorizontal: 20}}>
        <Text style={{textAlign: 'center'}}>No employees found</Text>
        <CustomButton
          label="Add Employee"
          onPress={() => navigation.navigate('AddEmployee')}
        />
      </View>
    );
  };

  const saveEmployees = async (employees: Employee[]) => {
    try {
      await AsyncStorage.setItem('employees', JSON.stringify(employees));
    } catch (error) {
      console.error('Error saving employees:', error);
    }
  };

  const sortEmployees = (by: 'firstName' | 'lastName') => {
    const sorted = [...employees].sort((a, b) => {
      if (a[by] < b[by]) return -1;
      if (a[by] > b[by]) return 1;
      return 0;
    });

    setEmployees(sorted);
    setSortedBy(by);
  };

  const clearSort = () => {
    setSortedBy(null);
    loadEmployees();
    closeSettingsModal();
  };

  const toggleDrawer = () => {
    setShowDrawer(!showDrawer);
  };

  const openSettingsModal = () => {
    setShowSettingsModal(true);
  };

  const closeSettingsModal = () => {
    setShowSettingsModal(false);
  };

  const closeOpenDrawer = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setShowDrawer(!showDrawer);
  };

  return (
    <TouchableWithoutFeedback
      onPress={showDrawer ? closeOpenDrawer : undefined}>
      <View style={{flex: 1}}>
        <View style={styles.header}>
          <TouchableOpacity onPress={toggleDrawer}>
            <Image
              style={styles.headerIconStyle}
              source={require('../assets/images/hamburger.png')}
            />
          </TouchableOpacity>
          <Text style={{color: 'white'}}>Employee List</Text>
          <TouchableOpacity onPress={openSettingsModal}>
            <Image
              style={styles.headerIconStyle}
              source={require('../assets/images/dots.png')}
            />
          </TouchableOpacity>
        </View>
        {employees.length === 0 ? (
          renderNoEmployees()
        ) : (
          <EmployeeList
            data={employees}
            onFavoriteToggle={employeeId => {
              const updatedEmployees = employees.map(employee => {
                if (employee.id === employeeId) {
                  return {...employee, isFavorite: !employee.isFavorite};
                }
                return employee;
              });
              setEmployees(updatedEmployees);
              saveEmployees(updatedEmployees);
            }}
          />
        )}
        {employees.length !== 0 ? (
          <FabButton
            onPress={() => navigation.navigate('AddEmployee')}
            onFavoritePress={() => navigation.navigate('FavoriteEmployees')} // Navigate to the FavoriteEmployees screen
          />
        ) : null}

        {showDrawer && (
          <TouchableWithoutFeedback onPress={closeOpenDrawer}>
            <View style={styles.drawer}>
              <Text>Total Employees: {employees.length}</Text>
              <Text>
                Total Favorites: {employees.filter(e => e.isFavorite).length}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        )}
        <SettingsModal
          visible={showSettingsModal}
          onClose={closeSettingsModal}
          onSortByFirstName={() => {
            sortEmployees('firstName');
            closeSettingsModal();
          }}
          onSortByLastName={() => {
            sortEmployees('lastName');
            closeSettingsModal();
          }}
          onClearSort={clearSort}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default EmployeeListScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: 'green',
  },
  drawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '70%',
    height: '100%',
    backgroundColor: 'white',
    padding: 16,
    elevation: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
  },
  headerIconStyle: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
    tintColor: 'white',
  },
});
