import Transaction from "../models/transaction.js";
import User from "../models/user.js"


export const addTransaction = async (req, res, next) => {

    const { description, amount, date, category, typeOfTransaction} = req.body;
    const owner = req.user._id;
    
    try {
        const user = await User.findById(owner);

        if (!user) {
            return res.status(404).json({ error: 'Invalid user or session' });
        }
        const newTransaction = new Transaction({
            typeOfTransaction,
            description,
            amount,
            date,
            category, 
            owner,
        });

        await newTransaction.save(); 

        if (typeOfTransaction === "income") {
            user.totalIncome += amount;
        } else if (typeOfTransaction === "expense") {
            user.totalExpense += amount;
            
        } 

        user.newBalance = user.totalIncome - user.totalExpense;

        await user.save();

    return res.status(200).json({
        "newBalance": user.newBalance,
        "transaction": {
            "description": newTransaction.description,
            "amount": newTransaction.amount,
            "date": newTransaction.date,
            "category": newTransaction.category,
            "_id": newTransaction._id
        }
    })
    
    } catch (error) {

    if (error.name === 'ValidationError') {
            return res.status(400).json({ error: error.message });
        }
    next(error)
}
}

