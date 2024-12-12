import express from "express";
import dotenv from "dotenv";
import { addExpense, addIncome, deleteTransaction, showBalance } from "../../controllers/transaction-controllers.js";
import { authenticateToken } from "../../middlewares/authToken.js";

dotenv.config();

const router = express.Router();

router.patch("/balance", authenticateToken, showBalance);
router.post("/add/expense", authenticateToken, addExpense);
router.post("/add/income", authenticateToken, addIncome);
router.delete("/:type/:id", authenticateToken, deleteTransaction)

export default router;
