// models/FailedAttempt.js
import mongoose from 'mongoose';

const FailedAttemptSchema = new mongoose.Schema({
  ip: { type: String, required: true, unique: true },
  attempts: { type: Number, required: true, default: 0 },
  firstAttempt: { type: Date, required: true, default: Date.now }
});

export default mongoose.models.FailedAttempt || mongoose.model('FailedAttempt', FailedAttemptSchema);
