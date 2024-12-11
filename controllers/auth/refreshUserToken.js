import jwt from "jsonwebtoken";
import User from "../../models/userSchema.js";
import { StatusCodes } from "http-status-codes";

const refreshUserToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Refresh token is required" });
    }

    let decoded;
    try {
      decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    } catch (err) {
      return res
        .status(StatusCodes.FORBIDDEN)
        .json({ message: "Invalid refresh token" });
    }

    const user = await User.findById(decoded.userId);

    if (!user || user.refreshToken !== refreshToken) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Invalid or expired refresh token" });
    }

    const accessToken = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(StatusCodes.OK).json({ accessToken });
  } catch (err) {
    next(err);
  }
};

export default refreshUserToken;
