import User from '../../models/userSchema.js';
import Transaction from '../../models/transactionSchema.js';
import { StatusCodes } from 'http-status-codes';

const addIncome = async (req, res) => {
  try {
    const { description, category, amount } = req.body;
    const userId = req.user._id;

    if (!description || !category || !amount) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Description, category, and amount are required' });
    }

    if (category !== 'Income') {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid category for income' });
    }
    const newIncome = new Transaction({
      description,
      category,
      amount,
      type: 'income',
      date: new Date(),
      userId,
    });
    await newIncome.save();
    await User.findByIdAndUpdate(
      userId,
      { $inc: { allIncome: amount } },
      { new: true }
    );

    return res.status(StatusCodes.CREATED).json({ message: 'Income added successfully', income: newIncome });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error adding income', error: error.message });
  }
};

export default addIncome;
