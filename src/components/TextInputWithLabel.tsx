// components/TextInputWithLabel.tsx
import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

interface TextInputWithLabelProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
}

const TextInputWithLabel: React.FC<TextInputWithLabelProps> = ({
  label,
  value,
  onChangeText,
}) => {
  return (
    <View style={styles.container}>
      <Text style={{color: 'black', marginTop: 20}}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    marginHorizontal: 20,
  },

  input: {
    borderBottomWidth: 2,
    padding: 8,
    borderBottomColor: 'green',
  },
});

export default TextInputWithLabel;
