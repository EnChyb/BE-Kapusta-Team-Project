import fetchUser from "../../services/findUser.js";
import updateUser from "../../services/updateUser.js";
import { StatusCodes } from "http-status-codes";

const logoutUser = async (req, res, next) => {
  try {
    const { userId } = req.user;

    const user = await fetchUser({ _id: userId });
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "User not found" });
    }

    await updateUser(user._id, { refreshToken: null });

    return res
      .status(StatusCodes.OK)
      .json({ message: "Successfully logged out" });
  } catch (err) {
    next(err);
  }
};

export default logoutUser;
