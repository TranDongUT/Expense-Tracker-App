import { View, Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';

// style
import { GlobalStyles } from '../../constants/GlobalStyles';

// utils
import { formatDate } from '../../utils/date';
import { useNavigation } from '@react-navigation/native';

export default function ExpenseItem({ id, description, amount, date }) {
  const navigation = useNavigation();

  const handlePressExpense = () => {
    navigation.navigate('ManageExpense', { expenseId: id });
  };

  return (
    <Pressable
      style={({ pressed }) => pressed && styles.pressed}
      onPress={handlePressExpense}
    >
      <View style={styles.expenseItem}>
        <View style={styles.textContainer}>
          <Text style={[styles.textBase, styles.description]}>
            {description}
          </Text>
          <Text style={styles.textBase}>{formatDate(date)}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>{amount.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },

  expenseItem: {
    padding: 12,
    marginVertical: 8,
    borderRadius: 6,
    backgroundColor: GlobalStyles.colors.primary500,
    elevation: 3,
    shadowColor: GlobalStyles.colors.gray500,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 4,
    shadowOpacity: 0.4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  textContainer: { flex: 1 },

  textBase: {
    color: GlobalStyles.colors.primary50,
    // flexWrap: 'wrap',
    flexShrink: 1,
  },

  description: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: 'bold',
  },

  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    minWidth: 80,
  },
  amount: {
    color: GlobalStyles.colors.primary500,
    fontWeight: 'bold',
  },
});
