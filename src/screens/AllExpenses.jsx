import { View, Text } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';

// store
import { ExpensesContext } from '../store/expenses-context';

// axios
import { fetchExpenses } from '../utils/httpRequest';

// components
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';

export default function AllExpenses() {
  const expensesCtx = useContext(ExpensesContext);

  const getExpenses = async () => {
    const expenses = await fetchExpenses();
    expensesCtx.setExpenses(expenses);
  };

  useEffect(() => {
    getExpenses();
  }, []);

  return (
    <ExpensesOutput
      expensesPeriod='Total'
      expenses={expensesCtx.expenses}
      fallbackText={'No registed expenses found!'}
    />
  );
}
