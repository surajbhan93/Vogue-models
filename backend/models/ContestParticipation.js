// backend/models/ContestParticipation.js
import mongoose from 'mongoose';

// 🔹 Sub-schema: entry submitted for a specific round
const roundSubmissionSchema = new mongoose.Schema(
  {
    roundNumber: {
      type: Number,
      required: true,
    },
    submissionType: {
      type: String,
      enum: ['photo', 'video'],
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    thumbnailUrl: String,
    caption: {
      type: String,
      maxlength: 300,
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
    score: {
      type: Number,
      min: 0,
      max: 100,
      default: null,
    },
    feedback: {
      type: String,
      maxlength: 500,
    },
    result: {
      type: String,
      enum: ['pending', 'selected', 'rejected'],
      default: 'pending',
    },
  },
  { _id: false }
);

const contestParticipationSchema = new mongoose.Schema(
  {
    contest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Contest',
      required: true,
      index: true,
    },
    model: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Model',
      required: true,
      index: true,
    },

    // 🔹 Registration (free)
    registrationStatus: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin',
      default: null,
    },
    approvedAt: Date,
    rejectionReason: String,

    // 🔹 Payment (participation fee, charged only after approval)
    paymentStatus: {
      type: String,
      enum: ['not_required', 'pending', 'paid', 'failed', 'refunded'],
      default: 'pending',
    },
    payment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Payment',
      default: null,
    },
    paidAmount: {
      type: Number,
      default: 0,
    },
    paidAt: Date,

    // 🔹 Progress through the contest journey
    currentStage: {
      type: String,
      enum: [
        'Registered',
        'Admin Approval',
        'Round 1',
        'Round 2',
        'Semi Final',
        'Grand Finale',
        'Eliminated',
        'Winner',
        'Runner-up',
        'Top 10',
      ],
      default: 'Registered',
    },
    isEliminated: {
      type: Boolean,
      default: false,
    },
    eliminatedAtRound: Number,

    roundSubmissions: [roundSubmissionSchema],

    // 🔹 Final result
    finalPosition: {
      type: String,
      enum: ['Winner', 'Runner-up', 'Top 10', null],
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// 🔹 A model can register only once per contest
contestParticipationSchema.index({ contest: 1, model: 1 }, { unique: true });
contestParticipationSchema.index({ contest: 1, currentStage: 1 });
contestParticipationSchema.index({ paymentStatus: 1 });

const ContestParticipation = mongoose.model(
  'ContestParticipation',
  contestParticipationSchema
);
export default ContestParticipation;