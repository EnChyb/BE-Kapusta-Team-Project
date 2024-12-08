import mongoose from 'mongoose'
const Schema = mongoose.Schema

const transactionSchema = new Schema(
  {
    description: {
      type: String,
      required: [true, 'Set description of transaction'],
    },
    category: {
        type: String,
        enum: ['Products', 'Alcohol', 'Entertainment', 'Health', 'Transport', 'Housing', 'Technique', 'Communal, Communication', 'Sports, Hobbies', 'Education', 'Other', 'Income'],
        required: [true, 'Set category of transaction']
    },
    amount: {
        type: Number,
        required: [true, 'Set amount of transaction']
    },
    date: {
      type: Date,
      default: Date.now
        }
  }, {
    versionKey: false,
    // timestamps: true,
  }
)

const Transaction = mongoose.model('transaction', transactionSchema, 'transactions')

export default Transaction;
