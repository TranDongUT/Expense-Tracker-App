import { View, Text, StyleSheet } from 'react-native';
import React, { useContext, useLayoutEffect, useState } from 'react';

// styles
import { GlobalStyles } from '../constants/GlobalStyles';

// store
import { ExpensesContext } from '../store/expenses-context';

// axios
import {
  deleteExpense,
  storeExpense,
  updateExpense,
} from '../utils/httpRequest';

// components
import IconButton from '../components/UI/IconButton';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverlay';

export default function ManageExpense({ route, navigation }) {
  const expensesCtx = useContext(ExpensesContext);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();

  const editedExpenseId = route.params?.expenseId;

  const selectedExpense = expensesCtx.expenses.find(
    (expense) => expense.id === editedExpenseId
  );

  const isEditting = !!editedExpenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditting ? 'Edit Expense' : 'Add Expense',
    });
  }, [navigation, isEditting]);

  const handleDeleteExpense = async () => {
    setIsSubmitting(true);
    try {
      await deleteExpense(editedExpenseId);
      expensesCtx.deleteExpense(editedExpenseId);
      navigation.goBack();
    } catch (error) {
      setError('Could not delete - Please try later!');
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  const handleConfirm = async (expenseData) => {
    setIsSubmitting(true);
    try {
      if (isEditting) {
        expensesCtx.updateExpense(editedExpenseId, expenseData);
        await updateExpense(editedExpenseId, expenseData);
      } else {
        const id = await storeExpense(expenseData);
        expensesCtx.addExpense({ ...expenseData, id: id });
      }
      navigation.goBack();
    } catch (error) {
      setError(
        `Could not ${
          isEditting ? 'update' : 'add new'
        } expense - Please try later!`
      );
      setIsSubmitting(false);
    }
  };

  const handleError = () => {
    setError(null);
  };

  if (error && !isSubmitting) {
    return <ErrorOverlay message={error} onConfirm={handleError} />;
  }

  if (isSubmitting) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        submitButtonTitle={isEditting ? 'Update' : 'Add'}
        onCancel={handleCancel}
        onSubmit={handleConfirm}
        defaultValue={selectedExpense}
      />

      {isEditting && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon='trash'
            size={36}
            color={GlobalStyles.colors.error500}
            onPress={handleDeleteExpense}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary800,
    padding: 24,
  },

  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary50,
    alignItems: 'center',
  },
});
