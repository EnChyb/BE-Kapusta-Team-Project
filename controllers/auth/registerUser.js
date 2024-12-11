import User from "../../models/userSchema.js";
import { StatusCodes } from "http-status-codes";

const registerUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(StatusCodes.CONFLICT)
        .json({ message: "User already exists" });
    }

    const newUser = new User({ email });
    await newUser.setPassword(password);
    await newUser.save();

    return res
      .status(StatusCodes.CREATED)
      .json({ message: "User registered successfully" });
  } catch (err) {
    next(err);
  }
};

export default registerUser;
