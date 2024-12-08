import User from '../../models/userSchema.js'; 
import { StatusCodes } from 'http-status-codes'; 

const updateBalance = async (req, res) => {
  try {
    const { userId } = req.user; 
    const { newBalance } = req.body; 
    if (newBalance === undefined || isNaN(newBalance)) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid balance value' });
    }
    const user = await User.findById(userId);

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found' });
    }
    user.balance = newBalance;
    await user.save();
    return res.status(StatusCodes.OK).json({ message: 'Balance updated successfully', balance: user.balance });
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};

export default updateBalance;
