import React, { useContext, useEffect, useState } from 'react';

// store
import { ExpensesContext } from '../store/expenses-context';

// utils
import { getDateMinusDays } from '../utils/date';
import { fetchExpenses } from '../utils/httpRequest';

// components
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverlay';

export default function RecentExpenses() {
  const expensesCtx = useContext(ExpensesContext);

  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();

  const getExpenses = async () => {
    setIsFetching(true);
    try {
      const expenses = await fetchExpenses();
      expensesCtx.setExpenses(expenses);
    } catch (error) {
      setError('Could not fetch expenses');
    }
    setIsFetching(false);
  };

  const recentExpense = expensesCtx.expenses.filter((expense) => {
    const today = new Date();

    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date >= date7DaysAgo && expense.date <= today;
  });

  useEffect(() => {
    getExpenses();
  }, []);

  const handleError = () => {
    setError(null);
  };

  if (error && !isFetching) {
    return <ErrorOverlay message={error} onConfirm={handleError} />;
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }

  return (
    <ExpensesOutput
      expensesPeriod='Last 7 days'
      expenses={recentExpense}
      fallbackText={'No expenses registed for last 7 days'}
    />
  );
}
