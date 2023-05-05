import axios from 'axios';

const axiosConfig = axios.create({
  baseURL:
    'https://udemy-rn-76370-default-rtdb.asia-southeast1.firebasedatabase.app',
});

export const storeExpense = async (expenseData) => {
  const response = await axiosConfig.post('/expenses.json', expenseData);
  return response.data.name;
};

export const fetchExpenses = async () => {
  const response = await axiosConfig.get('/expenses.json');
  const expenses = [];
  for (key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };

    expenses.push(expenseObj);
  }

  return expenses;
};

export const updateExpense = (id, expenseData) => {
  return axiosConfig.put(`/expenses/${id}.json`, expenseData);
};

export const deleteExpense = (id) => {
  return axiosConfig.delete(`/expenses/${id}.json`);
};
