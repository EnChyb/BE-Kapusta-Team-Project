const Transaction = require('../models/transactionSchema')

// check if it works
const findUserTransactions = async (userId) => {
    return await Transaction.find({ userId });
};

module.exports = findUserTransactions