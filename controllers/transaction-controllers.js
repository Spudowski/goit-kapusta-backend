import {
  fetchIncomes,
  fetchExpenses,
  removeTransaction,
  fetchCategories,
  fetchPeriod,
} from "../service/transaction-service.js";

export const postIncome = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

export const getAllIncomes = async (req, res, next) => {
  try {
    const allIncomes = await fetchIncomes();
    res.status(200).json(allIncomes);
  } catch (error) {
    next(error);
  }
};

export const postExpense = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

export const getAllExpenses = async (req, res, next) => {
  try {
    const allExpenses = await fetchExpenses();
    res.status(200).json(allExpenses);
  } catch (error) {
    next(error);
  }
};

export const deleteTransaction = async (req, res, next) => {
  try {
    await removeTransaction(id);
  } catch (error) {
    next(error);
  }
};

export const getIncomeCategories = async (req, res, next) => {
  try {
    const categoriesIncomes = await fetchCategories();
    res.status(200).json(categoriesIncomes);
  } catch (error) {
    next(error);
  }
};
export const getExpenseCategories = async (req, res, next) => {
  const categoriesExpenses = await fetchCategories();
  res.status(200).json(categoriesExpenses);
  try {
  } catch (error) {
    next(error);
  }
};
export const getTransactionsPeriod = async (req, res, next) => {
  try {
    const period = await fetchPeriod();
    res.status(200).json(period);
  } catch (error) {
    next(error);
  }
};
