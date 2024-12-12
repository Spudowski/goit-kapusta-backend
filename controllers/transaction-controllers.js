import {
  fetchIncomes,
  fetchExpenses,
  removeTransaction,
  fetchCategories,
  fetchPeriod,
} from "../service/transaction-service.js";
import User from "../models/user.js";
import Expense from "../models/expense.js";
import Income from "../models/income.js";

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

export const showBalance = async (req, res) => {
  const { balance } = req.body;

  if (typeof balance !== 'number' || balance < 0) {
    return res.status(400).json({ error: 'Balance must be bigger or equal 0' });
  }

  try {
    const user = await User.findByIdAndUpdate(req.user.id, { balance }, { new: true });

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.status(200).json({
      message: 'Balance updated',
      balance: user.balance,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error due to balance update' });
  };
};

export const addExpense = async (req, res) => {
  const { amount, category, description, date } = req.body;

  if (!amount || amount <= 0) {
    return res.status(400).json({ error: 'Expense cost must be bigger or equal 0' });
  }
  if (!category) {
    return res.status(400).json({ error: 'Category is required' });
  }

  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const newExpense = {
      userId: req.user.id,
      amount,
      category,
      description: description || '',
      date: date || new Date(),
    };

    user.expenses.push(newExpense);

    await user.save();

    res.status(201).json({ message: 'Expense added sucessfully', newExpense });
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Server error due to adding expenses' })
  }
};

export const addIncome = async (req, res) => {
  const { amount, source, description, date } = req.body;

  if (!amount || amount <= 0) {
    return res.status(400).json({ error: 'Income cost must be bigger or equal 0' });
  }
  if (!source) {
    return res.status(400).json({ error: 'Source is required' });
  }

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'Użytkownik nie został znaleziony.' });
    }

    const newIncome = await Income.create({
      userId: req.user.id,
      amount,
      source,
      description: description || '',
      date: date || new Date(),
    });

    user.incomes.push(newIncome._id);
    await user.save();

    res.status(201).json({ message: 'Income added sucessfully', newIncome });
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Server error due to adding income' })
  }
};

export const deleteTransaction = async (req, res) => {
  const { type, id } = req.params;

  try {
    let transaction;

    if (type === 'expense') {
      transaction = await Expense.findOneAndDelete({ _id: id, userId: req.user.id });
    } else if (type === 'income') {
      transaction = await Income.findOneAndDelete({ _id: id, userId: req.user.id });
    } else {
      return res.status(400).json({ error: 'Invalid transaction type. Use "expense" or "income" type.'  });
    }

    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found or not belong to user' });
    }

    res.status(200).json({ message: 'Transaction deleted sucessfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error due to transaction' });
  }
};