// components/FabButton.tsx
import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

interface FabButtonProps {
  onPress: () => void;
  onFavoritePress?: () => void;
}

const FabButton: React.FC<FabButtonProps> = ({onPress, onFavoritePress}) => {
  return (
    <TouchableOpacity style={styles.fab} onPress={onPress}>
      <Text style={styles.icon}>+</Text>
      {onFavoritePress && (
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={onFavoritePress}>
          <Text style={styles.favoriteIcon}>F</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: 'blue',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 24,
    color: 'white',
  },
  favoriteButton: {
    position: 'absolute',
    bottom: 80,
    backgroundColor: 'red',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteIcon: {
    fontSize: 24,
    color: 'white',
  },
});

export default FabButton;
