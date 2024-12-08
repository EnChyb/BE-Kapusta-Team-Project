import Transaction from '../models/transactionSchema'

// check if it works
const findUserTransactions = async (userId) => {
    return await Transaction.find({ userId });
};

export default findUserTransactions