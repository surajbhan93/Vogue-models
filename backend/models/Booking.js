// backend/models/Booking.js
import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  model: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Model',
    required: true,
    index: true,
  },
  clientName: {
    type: String,
    required: true,
  },
  agencyName: String,
  shootTitle: {
    type: String,
    required: true,
  },
  shootDate: {
    type: Date,
    required: true,
  },
  endDate: Date,
  location: {
    address: String,
    city: String,
    state: String,
    country: String,
  },
  amount: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ['upcoming', 'completed', 'cancelled'],
    default: 'upcoming',
  },
  notes: {
    type: String,
    maxlength: 1000,
  },
  invoiceUrl: {
    type: String,
    default: null,
  },
  relatedApplication: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'JobApplication',
  },
}, {
  timestamps: true,
});

bookingSchema.index({ model: 1, status: 1 });
bookingSchema.index({ model: 1, shootDate: 1 });

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
