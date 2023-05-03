import { View, Text, StyleSheet, Alert } from 'react-native';
import React, { useState } from 'react';
//utils
import { formatDate } from '../../utils/date';

// components
import Button from '../UI/Button';
import Input from './Input';
import { GlobalStyles } from '../../constants/GlobalStyles';

export default function ExpenseForm({
  submitButtonTitle,
  onCancel,
  onSubmit,
  defaultValue,
}) {
  const [inputValues, setInputValues] = useState({
    amount: {
      value: defaultValue ? defaultValue.amount.toString() : '',
      isValid: true,
    },
    date: {
      value: defaultValue ? formatDate(defaultValue.date) : '',
      isValid: true,
    },
    description: {
      value: defaultValue ? defaultValue.description : '',
      isValid: true,
    },
  });

  const handleChangeInput = (inputIndetify, value) => {
    setInputValues((prev) => ({
      ...prev,
      [inputIndetify]: { value: value, isValid: true },
    }));
  };

  const handleSubmit = () => {
    const expenseData = {
      amount: Number(inputValues.amount.value),
      date: new Date(inputValues.date.value),
      description: inputValues.description.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      //   Alert.alert('Invalid data', 'Check your inputs', [
      //     { text: 'Cancel', style: 'destructive' },
      //   ]);

      setInputValues((prev) => ({
        amount: {
          value: prev.amount.value,
          isValid: amountIsValid,
        },
        date: {
          value: prev.date.value,
          isValid: dateIsValid,
        },
        description: {
          value: prev.description.value,
          isValid: descriptionIsValid,
        },
      }));

      return;
    }

    onSubmit(expenseData);
  };

  const formIsInValid =
    !inputValues.amount.isValid ||
    !inputValues.date.isValid ||
    !inputValues.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          label='Amount'
          invalid={!inputValues.amount.isValid}
          textInputConfig={{
            keyboardType: 'decimal-pad',
            value: inputValues.amount.value,
            onChangeText: (value) => handleChangeInput('amount', value),
          }}
          style={styles.rowInput}
        />
        <Input
          label='Date'
          invalid={!inputValues.date.isValid}
          textInputConfig={{
            placeholder: 'YYYY-MM-DD',
            maxLenght: 10,
            value: inputValues.date.value,
            onChangeText: (value) => handleChangeInput('date', value),
          }}
          style={styles.rowInput}
        />
      </View>
      <Input
        label='Description'
        invalid={!inputValues.description.isValid}
        textInputConfig={{
          multiline: true, // default: false
          //   autoCaptialize: 'none' default: sentences
          //   autoCorrect: false  default: true

          value: inputValues.description.value,
          onChangeText: (value) => handleChangeInput('description', value),
        }}
      />
      {formIsInValid && (
        <Text style={styles.errorText}>
          Invalid input values - Please check your inputs
        </Text>
      )}
      <View style={styles.buttons}>
        <Button style={styles.button} mode='flat' onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={handleSubmit}>
          {submitButtonTitle}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },

  title: {
    marginVertical: 24,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },

  inputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  rowInput: {
    flex: 1,
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

  errorText: {
    color: GlobalStyles.colors.error500,
    margin: 9,
    textAlign: 'center',
  },
});
