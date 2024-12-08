import express from "express";
import dotenv from "dotenv";
import {
  postIncome,
  getAllIncomes,
  postExpense,
  getAllExpenses,
  deleteTransaction,
  getIncomeCategories,
  getExpenseCategories,
  getTransactionsPeriod,
} from "../../controllers/transaction-controllers.js";

dotenv.config();

const router = express.Router();

router.post("/income", postIncome);
router.get("/income", getAllIncomes);
router.post("/expense", postExpense);
router.get("/expense", getAllExpenses);
router.delete("/", deleteTransaction);
router.get("/income-categories", getIncomeCategories);
router.get("/expense-categories", getExpenseCategories);
router.get("/period-data", getTransactionsPeriod);

export default router;
