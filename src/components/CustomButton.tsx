import {Text, TouchableOpacity} from 'react-native';
import React from 'react';

const CustomButton = ({onPress, label}: any) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: 'green',
        alignItems: 'center',
        padding: 10,
        marginTop: 10,
      }}
      onPress={onPress}>
      <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
