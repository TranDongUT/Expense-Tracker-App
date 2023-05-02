import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

// style
import { GlobalStyles } from '../../constants/GlobalStyles';

export default function ExpensesSumary({ expenses, periodName }) {
  const expensesSum = expenses.reduce((sum, expense) => {
    return (sum += expense.amount);
  }, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.period}>{periodName}</Text>
      <Text style={styles.sum}>$ {expensesSum.toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: GlobalStyles.colors.primary50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  period: {
    fontSize: 12,
    color: GlobalStyles.colors.primary400,
  },

  sum: {
    fontSize: 16,
    fontWeight: 'bold',
    color: GlobalStyles.colors.primary400,
  },
});
