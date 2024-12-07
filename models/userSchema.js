const mongoose = require('mongoose');
const Transaction = require('./transactionSchema');
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true // minLength: 3, maxLength:254
    },
    password: {
      type: String,
      required: [true, 'Password is required'] // minLength: 8, maxLength:100
    },
    accessToken: {
      type: String,
      default: null,
    },
    refreshToken: {
      // needed for refresh token
      type: String,
    },
    sid: {
      // needed for refresh token
      type: String,
    },
    balance: {
      type: Number,
      default: 0
    },
    transactions: [Transaction] // schema from transactionSchema.js
  }, {
    versionKey: false,
    // timestamps: true,
  }
)

userSchema.methods.setPassword = async function (password)  {
  this.password = await bcrypt.hash(password, 10)

}

userSchema.methods.validatePassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

const User = mongoose.model('user', userSchema, 'users')

module.exports = User;
