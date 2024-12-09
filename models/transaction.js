import mongoose from "mongoose";

const { Schema } = mongoose;

const transactionSchema = new Schema({
  typeOfTransaction: {
    type: String, // Określa, czy to 'income' czy 'expense'
    enum: ["income", "expense"],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId, // Odniesienie do użytkownika
    ref: "User",
    required: true,
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
