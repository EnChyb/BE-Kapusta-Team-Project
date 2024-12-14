import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
}, { timestamps: true });

export const Session = mongoose.model('Session', sessionSchema);
