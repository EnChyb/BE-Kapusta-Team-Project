import mongoose from 'mongoose';
import Transaction from './transactionSchema';
import bcrypt from 'bcrypt'
const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    accessToken: {
      type: String,
      default: null,
    },
    refreshToken: {
      type: String,
    },
    sid: {
      type: String,
    },
    balance: {
      type: Number,
      default: 0,
    },
    transactions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'transaction', 
      },
    ],
  },
  {
    versionKey: false,
  }
);

userSchema.methods.setPassword = async function (password)  {
  this.password = await bcrypt.hash(password, 10)

}

userSchema.methods.validatePassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

const User = mongoose.model('user', userSchema, 'users')

export default User;
