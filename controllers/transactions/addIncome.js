import User from "../../models/userSchema.js";
import Transaction from "../../models/transactionSchema.js";
import { StatusCodes } from "http-status-codes";

const addIncome = async (req, res) => {
  try {
    const { description, category, amount, date } = req.body;
    const userId = req.user._id;

    // Validate category
    const validIncomeCategories = ["Salary", "Bonus"];
    if (!validIncomeCategories.includes(category)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Invalid category. Allowed categories are 'Salary' and 'Bonus'.",
      });
    }

    // Validate amount
    if (!amount || typeof amount !== "number" || amount <= 0) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Amount must be a positive number",
      });
    }

    // Create new transaction
    const newIncome = new Transaction({
      description,
      category,
      amount,
      type: "income",
      date: new Date(date).toISOString(),
      userId,
    });

    await newIncome.save();

    // Update user with findByIdAndUpdate
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $inc: { allIncome: amount }, // Increment total income
        $push: { transactions: newIncome._id }, // Add transaction ID
      },
      { new: true, useFindAndModify: false } // Return updated user
    );

    // Check if user exists
    if (!updatedUser) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "User not found",
      });
    }

    // Respond with success
    return res.status(StatusCodes.CREATED).json({
      message: "Income added successfully",
      income: newIncome,
    });
  } catch (error) {
    console.error("Error adding income:", error.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Error adding income",
      error: error.message,
    });
  }
};

export default addIncome;
