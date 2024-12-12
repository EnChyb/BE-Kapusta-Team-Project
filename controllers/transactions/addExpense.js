import findOneAndUpdateTransaction from '../../services/transactions/findOneAndUpdate.js';
import findUserByIdAndUpdate from '../../services/users/findByIdAndUpdate.js';
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

    const newExpense = await findOneAndUpdateTransaction(
      { _id: null },
      {
        description,
        category,
        amount,
        type: 'expense',
        date: new Date(),
        userId,
      },
      { upsert: true } 
    );
    const updatedUser = await findUserByIdAndUpdate(
      userId,
      {
        $push: { transactions: newExpense._id },
        $inc: { allExpense: amount },
      }
    );

    return res.status(StatusCodes.CREATED).json({
      message: 'Expense added successfully',
      expense: newExpense,
      user: updatedUser,
    });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Error adding expense', error: error.message });
  }
};

export default addExpense;
