import User from '../models/userSchema';

const updateUser = (_id, key) => {
  return User.findOneAndUpdate(
    { _id: _id },
    key,
    {
      new: true,
      validateBeforeSave: true,
      runValidators: true,
      context: "query",
    }
  );
}

export default updateUser
