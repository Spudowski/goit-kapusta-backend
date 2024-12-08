import mongoose from "mongoose";

const { Schema } = mongoose;

const transactionSchema = new Schema({
  description: {
    type: String,
  },
  amount: {
    type: Number,
  },
  date: {
    type: String,
  },
  category: {
    type: String,
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
