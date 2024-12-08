const User = require('../models/userSchema')

// Find user by key - eq. _id, email (_id is definied by MongoDB)
const fetchUser = (key) => {
  return User.findOne(key)

}

module.exports = fetchUser