import { View, Text, Pressable, StyleSheet } from 'react-native';
import React from 'react';
import { GlobalStyles } from '../../constants/GlobalStyles';

export default function Button({ children, mode, style, onPress }) {
  return (
    <View style={style}>
      <Pressable
        style={({ pressed }) => pressed && styles.pressed}
        onPress={onPress}
      >
        <View style={[styles.button, mode === 'flat' && styles.flatButton]}>
          <Text style={[styles.buttonText, mode === 'flat' && styles.flatText]}>
            {children}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary500,
  },

  flatButton: {
    backgroundColor: 'transparent',
  },

  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },

  flatText: {
    color: GlobalStyles.colors.primary200,
  },

  pressed: {
    backgroundColor: GlobalStyles.colors.primary100,
    opacity: 0.75,
    borderRadius: 4,
  },
});
