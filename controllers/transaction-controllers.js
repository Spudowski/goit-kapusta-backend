import {
  removeTransaction,
  fetchCategories,
  fetchPeriod,
} from "../service/transaction-service.js";
import User from "../models/user.js";
import Transaction from "../models/transaction.js";
import { createMonthStats } from "./transactionsHelpers.js";

export const addTransaction = async (req, res, next) => {

    const { description, amount, date, category, typeOfTransaction} = req.body;
    const owner = req.user.id;
    
    try {
        const user = await User.findById(owner);

        if (!user) {
            return res.status(404).json({ error: 'Invalid user or session' });
        }
        const newTransaction = new Transaction({
            typeOfTransaction,
            description,
            amount,
            date,
            category, 
            owner,
        });

        await newTransaction.save(); 

        if (typeOfTransaction === "income") {
            user.totalIncome += amount;
        } else if (typeOfTransaction === "expense") {
            user.totalExpense += amount;
            
        } 

        user.newBalance = user.totalIncome - user.totalExpense;

        await user.save();

    return res.status(200).json({
        "newBalance": user.newBalance,
        "transaction": {
            "description": newTransaction.description,
            "amount": newTransaction.amount,
            "date": newTransaction.date,
            "category": newTransaction.category,
            "_id": newTransaction._id
        }
    })
    
    } catch (error) {

    if (error.name === 'ValidationError') {
            return res.status(400).json({ error: error.message });
        }
    next(error)
}
}

export const getAllIncomess = async(req, res, next) => {
  try {
      const incomes = await Transaction.find({
          "typeOfTransaction": "income",
          "owner": req.user.id
      });
      const monthStats = createMonthStats(incomes);
      res.status(200).json({
          "incomes": incomes,
          "monthStats": monthStats
      });
    } catch (error) {
        next(error)
    }
}

export const getAllExpensess = async(req, res, next) => {
try {
    const expenses = await Transaction.find({ 
          "typeOfTransaction": "expense",
          "owner": req.user.id
    });
    const monthStats = createMonthStats(expenses);
    
      res.status(200).json({
          "expense": expenses,
          "monthStats": monthStats
      });
    } catch (error) {
        next(error)
    }
}

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
