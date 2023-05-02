import { View, Text, StyleSheet } from 'react-native';
import React, { useContext, useLayoutEffect } from 'react';

// styles
import { GlobalStyles } from '../constants/GlobalStyles';

// store
import { ExpensesContext } from '../store/expenses-context';

// components
import IconButton from '../components/UI/IconButton';
import Button from '../components/UI/Button';

export default function ManageExpense({ route, navigation }) {
  const expensesCtx = useContext(ExpensesContext);

  const editedExpenseId = route.params?.expenseId;

  const isEditting = !!editedExpenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditting ? 'Edit Expense' : 'Add Expense',
    });
  }, [navigation, isEditting]);

  const handleDeleteExpense = () => {
    expensesCtx.deleteExpense(editedExpenseId);
    navigation.goBack();
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  const handleConfirm = () => {
    if (isEditting) {
      expensesCtx.updateExpense(editedExpenseId, {
        description: 'test edit',
        amount: 9,
        date: new Date('2023-05-02'),
      });
    } else {
      expensesCtx.addExpense({
        description: 'test add',
        amount: 9,
        date: new Date('2023-05-02'),
      });
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <Button style={styles.button} mode='flat' onPress={handleCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={handleConfirm}>
          {isEditting ? 'Update' : 'Add'}
        </Button>
      </View>
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

  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },

  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary50,
    alignItems: 'center',
  },
});
