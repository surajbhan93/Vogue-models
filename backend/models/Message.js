// backend/models/Message.js
import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema({
  model: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Model',
    required: true,
    index: true,
  },
  // Simple counterpart info (agency/client) - not a full user system per MVP scope
  participantName: {
    type: String,
    required: true,
  },
  participantType: {
    type: String,
    enum: ['agency', 'client', 'admin'],
    default: 'agency',
  },
  lastMessage: {
    type: String,
    default: '',
  },
  lastMessageAt: {
    type: Date,
    default: Date.now,
  },
  unreadCount: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

const messageSchema = new mongoose.Schema({
  conversation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Conversation',
    required: true,
    index: true,
  },
  senderType: {
    type: String,
    enum: ['model', 'other'],
    required: true,
  },
  text: {
    type: String,
    maxlength: 2000,
  },
  fileUrl: {
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

export const Conversation = mongoose.model('Conversation', conversationSchema);
export const Message = mongoose.model('Message', messageSchema);
export default Message;
