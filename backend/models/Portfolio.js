// backend/models/Portfolio.js
import mongoose from 'mongoose';

const portfolioItemSchema = new mongoose.Schema({
  model: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Model',
    required: true,
    index: true,
  },
  type: {
    type: String,
    enum: ['image', 'video'],
    required: true,
  },
  isActive: {
  type: Boolean,
  default: true,
},
  url: {
    type: String,
    required: true,
  },
  thumbnailUrl: {
    type: String,
    default: null,
  },
  category: {
    type: String,
    enum: ['Fashion', 'Commercial', 'Runway', 'Fitness', 'Plus Size', 'Petite', 'Editorial', 'Catalog', 'Other'],
    default: 'Other',
  },
  caption: {
    type: String,
    maxlength: 200,
  },
  isCover: {
    type: Boolean,
    default: false,
  },
  order: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

portfolioItemSchema.index({ model: 1, type: 1 });

const Portfolio = mongoose.model('Portfolio', portfolioItemSchema);
export default Portfolio;
