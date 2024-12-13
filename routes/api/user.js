import express from "express";
import dotenv from "dotenv";
import { authenticateToken } from "../../middlewares/authToken.js";
import {
  getAllUserInfo,
  updateBalance,
} from "../../controllers/user-controllers.js";

dotenv.config();

const router = express.Router();

router.patch("/balance", authenticateToken, updateBalance);
router.get("/", authenticateToken, getAllUserInfo);

export default router;
