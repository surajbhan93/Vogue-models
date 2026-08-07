// backend/models/Contest.js
import mongoose from 'mongoose';

// 🔹 Sub-schema: a single round in the contest journey
const roundSchema = new mongoose.Schema(
  {
    roundNumber: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      enum: [
        'Round 1 - Photo Submission',
        'Round 2 - Video/Ramp Walk',
        'Semi Final',
        'Grand Finale',
      ],
      required: true,
    },
    description: {
      type: String,
      maxlength: 500,
    },
    submissionType: {
      type: String,
      enum: ['photo', 'video', 'live', 'none'],
      default: 'none',
      
    },
    startDate: Date,
    endDate: Date,
    maxParticipantsSelected: Number, // e.g. Top 100, Top 20
    status: {
      type: String,
      enum: ['upcoming', 'ongoing', 'completed'],
      default: 'upcoming',
    },
  },
  { _id: false }
);

// 🔹 Sub-schema: prize details
const prizeSchema = new mongoose.Schema(
  {
    position: {
      type: String,
      enum: ['Winner', 'Runner-up', 'Top 10'],
      required: true,
    },
    title: String,
    cashPrize: Number,
    description: String,
  },
  { _id: false }
);

const contestSchema = new mongoose.Schema(
  {
    // 🔹 Basic Info
    title: {
      type: String,
      required: [true, 'Contest title is required'],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      maxlength: 2000,
    },
    bannerImage: {
      type: String,
      default: null,
    },

    // 🔹 Timeline
    registrationStart: {
      type: Date,
      required: true,
    },
    registrationEnd: {
      type: Date,
      required: true,
    },
    rounds: [roundSchema],

    // 🔹 Current progress (matches your flow diagram)
    currentStage: {
      type: String,
      enum: [
        'Published',
        'Registration Open',
        'Registration Closed',
        'Admin Approval',
        'Round 1',
        'Round 2',
        'Semi Final',
        'Grand Finale',
        'Completed',
        'Cancelled',
      ],
      default: 'Published',
    },

    // 🔹 Fees — registration is free, participation (after approval) is paid
    registrationFee: {
      type: Number,
      default: 0,
    },
    participationFee: {
      type: Number,
      required: [true, 'Participation fee is required'],
      min: 0,
    },

    // 🔹 Eligibility
    eligibility: {
      minAge: { type: Number, default: 16 },
      maxAge: { type: Number, default: 40 },
      gender: {
        type: String,
        enum: ['Male', 'Female', 'Other', 'All'],
        default: 'All',
      },
    },

    location: {
      city: String,
      state: String,
      country: String,
      venue: String,
    },

    // 🔹 Prizes
    prizes: [prizeSchema],

    // 🔹 Visibility / lifecycle status
    status: {
      type: String,
      enum: ['draft', 'published', 'ongoing', 'completed', 'cancelled'],
      default: 'draft',
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },

    // 🔹 Final results
    winner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Model',
      default: null,
    },
    runnerUp: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Model',
      default: null,
    },
    top10: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Model',
      },
    ],

    // 🔹 Stats
    totalRegistrations: {
      type: Number,
      default: 0,
    },
    totalPaidParticipants: {
      type: Number,
      default: 0,
    },
    views: {
      type: Number,
      default: 0,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin',
    },
  },
  {
    timestamps: true,
  }
);

// 🔹 Indexes
contestSchema.index({ status: 1 });
contestSchema.index({ registrationStart: 1, registrationEnd: 1 });
contestSchema.index({ slug: 1 });

// 🔹 Auto-generate slug from title
contestSchema.pre('validate', function (next) {
  if (this.title && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

// 🔹 Virtual: phase used by the public listing (upcoming / ongoing / past)
contestSchema.virtual('phase').get(function () {
  const now = new Date();
  if (this.status === 'cancelled') return 'cancelled';
  if (this.status === 'completed') return 'past';
  if (now < this.registrationStart) return 'upcoming';
  return 'ongoing';
});



contestSchema.set('toJSON', { virtuals: true });
contestSchema.set('toObject', { virtuals: true });

const Contest = mongoose.model('Contest', contestSchema);
export default Contest;