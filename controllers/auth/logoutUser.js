import User from "../../models/userSchema.js";
import { StatusCodes } from "http-status-codes";

const logoutUser = async (req, res, next) => {
  try {
    const { userId } = req.user;

    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "User not found" });
    }

    user.refreshToken = null;
    await user.save();

    return res
      .status(StatusCodes.OK)
      .json({ message: "Successfully logged out" });
  } catch (err) {
    next(err);
  }
};

export default logoutUser;
