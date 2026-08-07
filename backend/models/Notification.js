// backend/models/Notification.js
import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  model: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Model',
    required: true,
    index: true,
  },
  type: {
    type: String,
    enum: ['new_casting', 'booking_confirmed', 'profile_viewed', 'payment_received', 'application_update', 'system'],
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    maxlength: 500,
  },
  link: {
    type: String,
    default: null,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

notificationSchema.index({ model: 1, isRead: 1 });
notificationSchema.index({ model: 1, createdAt: -1 });

const Notification = mongoose.model('Notification', notificationSchema);
export default Notification;
