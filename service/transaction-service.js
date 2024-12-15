import Transaction from "../models/transaction.js";


export const removeTransaction = (id) => Transaction.deleteOne({ _id: id });

export const fetchCategories = (typeOfTransaction) => {
  return Transaction.distinct("category", {
    typeOfTransaction,
  });
};

export const fetchPeriod = (startDate, endDate) => {
  return Transaction.find({
    date: { $gte: new Date(startDate), $lte: new Date(endDate) },
  });
};
