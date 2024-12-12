import Transaction from '../../models/transactionSchema.js';
import { StatusCodes } from 'http-status-codes';

const getExpense = async (req, res) => {
  try {
    const userId = req.user._id;

    const currentYear = new Date().getFullYear();

    const monthlyExpenses = await Transaction.aggregate([
      {
        $match: {
          userId,
          type: 'expense',
          date: {
            $gte: new Date(`${currentYear}-01-01`),
            $lte: new Date(`${currentYear}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: { $month: '$date' },
          totalAmount: { $sum: '$amount' },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    const expensesSummary = monthlyExpenses.map((item) => ({
      month: item._id,
      totalAmount: item.totalAmount,
    }));

    return res.status(StatusCodes.OK).json({
      year: currentYear,
      expenses: expensesSummary,
    });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Error fetching expenses stats', error: error.message });
  }
};

export default getExpense;
