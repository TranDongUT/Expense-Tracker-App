import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

import ExpensesSumary from './ExpensesSumary';
import ExpensesList from './ExpensesList';
import { GlobalStyles } from '../../constants/GlobalStyles';

export default function ExpensesOutput({
  expenses,
  expensesPeriod,
  fallbackText,
}) {
  let content = (
    <View>
      <Text style={styles.inforText}>{fallbackText}</Text>
    </View>
  );

  if (expenses.length > 0) {
    content = <ExpensesList expenses={expenses} />;
  }

  return (
    <View style={styles.container}>
      <ExpensesSumary expenses={expenses} periodName={expensesPeriod} />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 24,
    backgroundColor: GlobalStyles.colors.primary700,
    flex: 1,
  },

  inforText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    marginTop: 32,
  },
});
