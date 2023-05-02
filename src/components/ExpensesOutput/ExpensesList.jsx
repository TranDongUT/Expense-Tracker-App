import { View, Text, FlatList } from 'react-native';
import React from 'react';
import ExpenseItem from './ExpenseItem';

const renderExpenseItem = (expenseData) => {
  return <ExpenseItem {...expenseData.item} />;
};

export default function ExpensesList({ expenses }) {
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={expenses}
      renderItem={renderExpenseItem}
      keyExtractor={(expense) => expense.id}
    />
  );
}
