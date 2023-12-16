// components/StarButton.tsx
import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

interface StarButtonProps {
  isFavorite: boolean;
  onPress?: () => void;
}

const StarButton: React.FC<StarButtonProps> = ({isFavorite, onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text
        style={[
          styles.icon,
          {
            color: isFavorite ? 'green' : 'black',
          },
        ]}>
        {isFavorite ? '★' : '☆'}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderRadius: 12,
  },
  icon: {
    fontSize: 30,
  },
});

export default StarButton;
