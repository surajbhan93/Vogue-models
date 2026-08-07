// backend/models/Payment.js
import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  model: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Model',
    required: true,
    index: true,
  },
  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
  },
  relatedContest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contest',
  },
  type: {
    type: String,
    enum: [
      'earning',
      'withdrawal',
      'contest_fee',
      'contest_participation',
      'subscription',
      'booking',
      'other',
    ],
    default: 'contest_participation',
    required: [true, 'Payment type is required'],
  },
  purpose: {
    type: String,
    default: 'contest_participation',
  },
  amount: {
    type: Number,
    required: [true, 'Payment amount is required'],
    min: 0,
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'paid', 'failed', 'refunded'],
    default: 'pending',
  },
  method: {
    type: String,
    enum: ['bank_transfer', 'upi', 'paypal', 'card', 'online', 'other'],
    default: 'upi',
  },
  transactionId: {
    type: String,
    trim: true,
  },
  note: {
    type: String,
    maxlength: 300,
  },
  processedAt: Date,
}, {
  timestamps: true,
});

// 🔹 Indexes for fast queries
paymentSchema.index({ model: 1, type: 1, status: 1 });
paymentSchema.index({ relatedContest: 1 });

const Payment = mongoose.model('Payment', paymentSchema);
export default Payment;