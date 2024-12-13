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

//------------------ poniżej Anita
export const deleteTransaction = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await removeTransaction(id);
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const getIncomeCategories = async (req, res, next) => {
  try {
    const categoriesIncomes = await fetchCategories("income");
    res.status(200).json(categoriesIncomes);
  } catch (error) {
    next(error);
  }
};
export const getExpenseCategories = async (req, res, next) => {
  try {
    const categoriesExpenses = await fetchCategories("expense");
    res.status(200).json(categoriesExpenses);
  } catch (error) {
    next(error);
  }
};

export const getTransactionsPeriod = async (req, res, next) => {
  const { startDate, endDate } = req.query;
  try {
    const period = await fetchPeriod(startDate, endDate);
    if (!startDate || !endDate) {
      return res
        .status(400)
        .json({ message: "Both startDate and endDate are required" });
    }
    if (isNaN(new Date(startDate)) || isNaN(new Date(endDate))) {
      return res.status(400).json({ message: "Invalid date format" });
    }
    res.status(200).json(period);
  } catch (error) {
    next(error);
  }
};
