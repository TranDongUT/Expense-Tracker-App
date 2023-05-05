import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import Button from './Button';
import { GlobalStyles } from '../../constants/GlobalStyles';

export default function ErrorOverlay({ message, onConfirm }) {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>Error</Text>
      <Text style={styles.text}>{message}</Text>
      <Button onPress={onConfirm}>Okey</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GlobalStyles.colors.gray700,
  },

  text: {
    textAlign: 'center',
    color: '#fff',
    marginBottom: 8,
  },

  title: {
    fontWeight: 'bold',
    fontSize: 20,
  },
});
