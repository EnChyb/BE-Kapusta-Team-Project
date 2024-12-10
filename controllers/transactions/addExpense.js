import Transaction from '../../models/transactionSchema.js';
import User from '../../models/userSchema.js';
import { StatusCodes } from 'http-status-codes';

const addExpense = async (req, res) => {
  try {
    const { description, category, amount } = req.body;
    const userId = req.user._id; 

    if (!description || !category || !amount) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Description, category, and amount are required' });
    }

    if (
      ![
        'Products',
        'Alcohol',
        'Entertainment',
        'Health',
        'Transport',
        'Housing',
        'Technique',
        'Communal, Communication',
        'Sports, Hobbies',
        'Education',
        'Other',
      ].includes(category)
    ) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Invalid category' });
    }

    const newExpense = new Transaction({
      description,
      category,
      amount,
      type: 'expense',
      date: new Date(),
      userId, 
    });

    const savedExpense = await newExpense.save();

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $push: { transactions: savedExpense._id },
        $inc: { allExpense: amount },
      },
      { new: true } 
    );

    return res.status(StatusCodes.CREATED).json({
      message: 'Expense added successfully',
      expense: savedExpense,
      user: updatedUser, 
    });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Error adding expense', error: error.message });
  }
};

export default addExpense;
