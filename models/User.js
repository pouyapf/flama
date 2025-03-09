
import mongoose from 'mongoose';
const contactSchema = new mongoose.Schema({
  isnewsup: { type: Boolean, default: true },
  isopensup: { type: Boolean, default: true },
  messages: [{
    sender: String,
    role: String,
    message: String,
    timestamp: { type: Date, default: Date.now }
  }]
}, { _id: false });

const orderSchema = new mongoose.Schema({
  items: Array,
  isNew1: { type: Boolean, default: true },
  totalPrice: Number,
  planName: String,
  description: String,
  currentStage: Number,
  inprogress: { type: Boolean, default: false },
  imageUrls: [String],
  payout1: {
    price: Number,
    status: { type: Boolean, default: false },
    details: [{
      authority: String,
      status: String,
      amount: Number,
      date: Date,
      trackingCode: String, 
    }]
  },
  payout2: {
    price: Number,
    status: { type: Boolean, default: false },
    details: [{
      authority: String, // شناسه پرداخت
      status: String,
      amount: Number,
      date: Date,
      trackingCode: String, // Add tracking code
      paymentId: String     // Add شناسه پرداخت (Payment ID)
    }]
  },
  payout3: {
    price: Number,
    status: { type: Boolean, default: false },
    details: [{
      authority: String, // شناسه پرداخت
      status: String,
      amount: Number,
      date: Date,
      trackingCode: String, // Add tracking code
      paymentId: String     // Add شناسه پرداخت (Payment ID)
    }]
  },
  contact: contactSchema // Existing contact field
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  number: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
  verificationToken: { type: String },
  verificationTokenSentAt: { type: Date },
  orders: [orderSchema]
}, { collection: 'users' });

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
