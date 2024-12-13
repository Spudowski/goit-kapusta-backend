import express from "express";
import dotenv from "dotenv";
import {
  getAllUserInfo,
  updateBalance,
} from "../../controllers/user-controllers.js";

dotenv.config();

const router = express.Router();

router.patch("/balance", updateBalance); //tu Adrian Twoja funkcja Balance
router.get("/", getAllUserInfo);

export default router;
