// backend/models/JobApplication.js
import mongoose from 'mongoose';

const jobApplicationSchema = new mongoose.Schema({
  model: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Model',
    required: true,
    index: true,
  },
  jobTitle: {
    type: String,
    required: true,
  },
  agencyName: {
    type: String,
  },
  jobId: {
    // reference to a Job/Casting collection if/when it exists
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
  },
  description: {
    type: String,
    maxlength: 1000,
  },
  location: {
    city: String,
    state: String,
    country: String,
  },
  shootDate: Date,
  budget: Number,
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'withdrawn'],
    default: 'pending',
  },
  appliedAt: {
    type: Date,
    default: Date.now,
  },
  respondedAt: Date,
}, {
  timestamps: true,
});

jobApplicationSchema.index({ model: 1, status: 1 });

const JobApplication = mongoose.model('JobApplication', jobApplicationSchema);
export default JobApplication;
