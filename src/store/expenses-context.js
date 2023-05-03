import { createContext, useReducer } from 'react';

const DUMMY_EXPENSES = [
  {
    id: 'e1',
    description: 'Have launch',
    amount: 30.0,
    date: new Date('2023-04-28'),
  },
  {
    id: 'e2',
    description: 'Fill gas',
    amount: 50.0,
    date: new Date('2023-04-29'),
  },
  {
    id: 'e3',
    description: 'Comestic',
    amount: 305.0,
    date: new Date('2023-30-05'),
  },
  {
    id: 'e4',
    description: 'Books',
    amount: 100.0,
    date: new Date('2023-05-01'),
  },
  {
    id: 'e5',
    description: 'Helmet',
    amount: 680.0,
    date: new Date('2023-05-05'),
  },
];

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

const expensesReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state];

    case 'DELETE':
      return state.filter((expense) => expense.id !== action.payload);

    case 'UPDATE':
      const updateExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableExpense = state[updateExpenseIndex];
      const updateItem = { ...updatableExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updateExpenseIndex] = updateItem;
      return updatedExpenses;

    default:
      return state;
  }
};

export default function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES); // useReducer(reducer, initial)

  const addExpense = (expenseData) => {
    dispatch({ type: 'ADD', payload: expenseData });
  };

  const deleteExpense = (id) => {
    dispatch({ type: 'DELETE', payload: id });
  };

  const updateExpense = (id, expenseData) => {
    dispatch({ type: 'UPDATE', payload: { id: id, data: expenseData } });
  };

  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}
