import fetchUser from "../../services/findUser.js";
import User from "../../models/userSchema.js";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";

const registerUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const existingUser = await fetchUser({ email });
    if (existingUser) {
      return res.status(StatusCodes.CONFLICT).json({
        message: "User already exists"
      });
    }

    const newUser = new User({ email });
    await newUser.setPassword(password);
    await newUser.save();

    const payload = { userId: newUser._id, email: newUser.email };
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || "1h"
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "7d"
    });

    newUser.refreshToken = refreshToken;
    await newUser.save();

    return res.status(StatusCodes.CREATED).json({
      message: "User registered successfully",
      accessToken,
      refreshToken,
      userData: {
        id: newUser._id,
        email: newUser.email,
        balance: newUser.balance,
        allIncome: newUser.allIncome,
        allExpense: newUser.allExpense,
        transactions: newUser.transactions
      }
    });
  } catch (err) {
    console.error("Error during user registration:", err.message);
    next(err);
  }
};

export default registerUser;
