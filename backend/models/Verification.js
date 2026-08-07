// backend/models/Verification.js
import mongoose from 'mongoose';

const verificationSchema = new mongoose.Schema({
  model: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Model',
    required: true,
    unique: true,
    index: true,
  },
  aadhaar: {
    fileUrl: String,
    number: String, // consider encrypting/masking in production
  },
  pan: {
    fileUrl: String,
    number: String,
  },
  passport: {
    fileUrl: String,
    number: String,
  },
  selfieUrl: {
    type: String,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  rejectionReason: {
    type: String,
    maxlength: 300,
  },
  reviewedAt: Date,
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Model', // admin user, same collection with role 'admin'
  },
}, {
  timestamps: true,
});

const Verification = mongoose.model('Verification', verificationSchema);
export default Verification;
