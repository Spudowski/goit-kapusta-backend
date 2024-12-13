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
import { authenticateToken } from "../../middlewares/authToken.js";

dotenv.config();

const router = express.Router();

router.post("/income", authenticateToken, postIncome);
router.get("/income", authenticateToken, getAllIncomes);
router.post("/expense", authenticateToken, postExpense);
router.get("/expense", authenticateToken, getAllExpenses);
//------------------ poniżej Anita
router.delete("/:id", authenticateToken, deleteTransaction);
router.get("/income-categories", authenticateToken, getIncomeCategories);
router.get("/expense-categories", authenticateToken, getExpenseCategories);
router.get("/period-data", authenticateToken, getTransactionsPeriod);

export default router;
