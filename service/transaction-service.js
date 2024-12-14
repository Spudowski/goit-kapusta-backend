import Transaction from "../models/transaction.js";

export const fetchIncomes = () => {
  return Transaction.getAll();
};
export const fetchExpenses = () => {
  return Transaction.getAll();
};

//------------------ poniżej Anita
export const removeTransaction = (id) => Transaction.deleteOne({ _id: id });

export const fetchCategories = (typeOfTransaction) => {
  return Transaction.distinct("category", {
    typeOfTransaction, // filter - income lub expense
  });
};

export const fetchPeriod = (startDate, endDate) => {
  return Transaction.find({
    date: { $gte: new Date(startDate), $lte: new Date(endDate) },
  });
};
