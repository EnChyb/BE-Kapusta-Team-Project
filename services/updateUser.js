const User = require('../models/userSchema')

// check if it works
// Update User - eq. token, balance
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

module.exports = updateUser