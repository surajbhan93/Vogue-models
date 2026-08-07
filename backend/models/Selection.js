import mongoose from "mongoose";

const roundSchema = new mongoose.Schema(
  {
    round: {
      type: Number,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "skipped"],
      default: "pending",
    },

    reviewedAt: {
      type: Date,
      default: null,
    },

    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Model",
      default: null,
    },

    remarks: {
      type: String,
      maxlength: 500,
      default: "",
    },
  },
  { _id: false }
);

const selectionSchema = new mongoose.Schema(
  {
    model: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Model",
      required: true,
      unique: true,
      index: true,
    },

    currentRound: {
      type: Number,
      default: 1,
    },

    overallStatus: {
      type: String,
      enum: [
        "pending",
        "in_review",
        "selected",
        "rejected"
      ],
      default: "pending",
    },

    finalDecisionDate: {
      type: Date,
      default: null,
    },

    selectedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Model",
      default: null,
    },

    adminRemarks: {
      type: String,
      maxlength: 1000,
      default: "",
    },

    rounds: {
      type: [roundSchema],
      default: [
        {
          round: 1,
          title: "Profile Review",
          status: "pending",
        },
        {
          round: 2,
          title: "Portfolio Review",
          status: "pending",
        },
        {
          round: 3,
          title: "Walk / Audition",
          status: "pending",
        },
        {
          round: 4,
          title: "Final Decision",
          status: "pending",
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

selectionSchema.index({
  overallStatus: 1,
});

selectionSchema.index({
  currentRound: 1,
});

const Selection = mongoose.model("Selection", selectionSchema);

export default Selection;