const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const logger = require("morgan");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

connectDB();

const authRouter = require("./routes/api/auth");
app.use("/api/auth", authRouter);

const usersRouter = require("./routes/api/user");
app.use("/api/user", usersRouter);

const transactionsRouter = require("./routes/api/transaction");
app.use("/api/transaction", transactionsRouter);

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
app.use(logger(formatsLogger));

app.use((req, res) => {
  res.status(404).json({
    message: `Not found - ${req.path}`,
  });
});

app.use((err, req, res, next) => {
  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: err.message,
    });
  }
  res.status(500).json({
    message: err.message || `Internal Server Error. Something broke!`,
  });
});

module.exports = app;
