// backend/models/Contact.js
import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  // 🔹 Personal Information
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters'],
    maxlength: [50, 'Name cannot exceed 50 characters'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email'],
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    minlength: [10, 'Phone number must be at least 10 digits'],
  },
  
  // 🔹 Message Details
  subject: {
    type: String,
    required: [true, 'Subject is required'],
    trim: true,
    minlength: [3, 'Subject must be at least 3 characters'],
    maxlength: [100, 'Subject cannot exceed 100 characters'],
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
    minlength: [10, 'Message must be at least 10 characters'],
    maxlength: [1000, 'Message cannot exceed 1000 characters'],
  },
  
  // 🔹 Category/Type
  category: {
    type: String,
    enum: ['general', 'booking', 'collaboration', 'support', 'feedback', 'other'],
    default: 'general',
  },
  
  // 🔹 Status
  status: {
    type: String,
    enum: ['pending', 'read', 'replied', 'resolved', 'spam'],
    default: 'pending',
  },
  
  // 🔹 Priority
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium',
  },
  
  // 🔹 User Reference (if logged in)
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Model',
    default: null,
  },
  
  // 🔹 Admin Response
  adminResponse: {
    message: String,
    respondedAt: Date,
    respondedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin',
    },
  },
  
  // 🔹 System Fields
  ipAddress: String,
  userAgent: String,
  isRead: {
    type: Boolean,
    default: false,
  },
  readAt: Date,
  
  // 🔹 Model URL (for frontend display)
  modelImageUrl: {
    type: String,
    default: null,
  },
}, {
  timestamps: true,
});

// 🔹 Indexes
contactSchema.index({ email: 1 });
contactSchema.index({ status: 1 });
contactSchema.index({ createdAt: -1 });
contactSchema.index({ category: 1 });

// 🔹 Virtual for formatted date
contactSchema.virtual('formattedDate').get(function() {
  return this.createdAt.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
});

// 🔹 Virtual for short message
contactSchema.virtual('shortMessage').get(function() {
  return this.message.length > 100 
    ? this.message.substring(0, 100) + '...' 
    : this.message;
});

// 🔹 Set JSON options
contactSchema.set('toJSON', { virtuals: true });
contactSchema.set('toObject', { virtuals: true });

const Contact = mongoose.model('Contact', contactSchema);
export default Contact;