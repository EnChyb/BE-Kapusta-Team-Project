import User from "../../models/userSchema.js";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || !(await user.validatePassword(password))) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Invalid credentials" });
    }

    const accessToken = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" }
    );

    user.refreshToken = refreshToken;
    await user.save();

    return res.status(StatusCodes.OK).json({ accessToken, refreshToken });
  } catch (err) {
    next(err);
  }
};

export default loginUser;
