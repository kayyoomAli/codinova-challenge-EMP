// components/SettingsModal.tsx
import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';

interface SettingsModalProps {
  visible: boolean;
  onClose: () => void;
  onSortByFirstName: () => void;
  onSortByLastName: () => void;
  onClearSort: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  visible,
  onClose,
  onSortByFirstName,
  onSortByLastName,
  onClearSort,
}) => {
  return (
    <Modal visible={visible} animationType="fade" transparent>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.textStyle}>Sort Employees By:</Text>
            <TouchableOpacity onPress={onSortByFirstName}>
              <Text style={styles.textStyle}>First Name</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onSortByLastName}>
              <Text style={styles.textStyle}>Last Name</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onClearSort}>
              <Text style={styles.textStyle}>Clear Sorting</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.textStyle}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    marginTop: 40,
    width: 200,
    position: 'absolute',
    right: 20,
  },
  textStyle: {
    color: 'black',
    marginVertical: 7,
  },
});

export default SettingsModal;
