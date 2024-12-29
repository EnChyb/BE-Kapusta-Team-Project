import fetchUser from "../../services/findUser.js";
import updateUser from "../../services/updateUser.js";
import { StatusCodes } from "http-status-codes";
import redisClient from '../../utils/redisClient.js'; // Poprawna ścieżka relatywna do redisClient.js


const logoutUser = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const token = req.token;
    const user = await fetchUser({ _id });
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "User not found" });
    }

    await updateUser(_id, { refreshToken: null, sid: null });

    redisClient.setex(token, 3600, 'blacklisted', (err) => { // Token wygasa po 1 godzinie (3600 sekund)
      if (err) {
        console.error('Redis error:', err);
        return res.sendStatus(500);
      }
    });
    return res
      .status(StatusCodes.OK)
      .json({ message: "Successfully logged out" });
  } catch (err) {
    next(err);
  }
};

export default logoutUser;
