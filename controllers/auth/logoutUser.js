import fetchUser from "../../services/findUser.js";
import updateUser from "../../services/updateUser.js";
import { StatusCodes } from "http-status-codes";
import { Session } from '../../models/session.js';
import jwt from 'jsonwebtoken';

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
    
const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'No token provided' });
    }

    // Dodaj token do czarnej listy
    const expiresAt = jwt.decode(token).exp * 1000; // Konwertuj na milisekundy
    await Session.create({ token, expiresAt });

    return res
      .status(StatusCodes.OK)
      .json({ message: "Successfully logged out" });
  } catch (err) {
    next(err);
  }
};

export default logoutUser;
