import Transaction from '../../models/transactionSchema.js';
import User from '../../models/userSchema.js';
import { StatusCodes } from 'http-status-codes'; 


const deleteTransaction = async (req, res, next) => {
  const { transactionId } = req.params; 

  try {
    const transaction = await Transaction.findByIdAndDelete(transactionId); 

    if (!transaction) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'Transaction not found' }); 
    }

    await User.updateOne( { _id: transaction.userId }, { $pull: { transactions: transactionId } } );

    res.status(StatusCodes.OK).json({ message: 'Transaction deleted successfully' }); 
  } catch (error) {
    next(error); 
  }
};

export default deleteTransaction;
