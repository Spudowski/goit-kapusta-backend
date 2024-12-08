import Transaction from "../models/transaction.js";

// rozróżnić incomes i expenses? czy wykorzystać jedną funkcję
export const fetchIncomes = () => {
  return Transaction.getAll();
};
export const fetchExpenses = () => {
  return Transaction.getAll();
};

export const removeTransaction = (id) => Transaction.deleteOne({ _id: id });

// rozróżnić incomes i expenses? czy wykorzystać jedną funkcję
export const fetchCategories = () => {
  return;
  // Transaction.getAll();
};

export const fetchPeriod = () => {
  return;
  // Transaction.getAll();
};
