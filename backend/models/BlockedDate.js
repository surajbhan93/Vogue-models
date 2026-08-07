// backend/models/BlockedDate.js
import mongoose from 'mongoose';

const blockedDateSchema = new mongoose.Schema({
  model: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Model',
    required: true,
    index: true,
  },
  date: {
    type: Date,
    required: true,
  },
  reason: {
    type: String,
    maxlength: 200,
  },
}, {
  timestamps: true,
});

blockedDateSchema.index({ model: 1, date: 1 }, { unique: true });

const BlockedDate = mongoose.model('BlockedDate', blockedDateSchema);
export default BlockedDate;
