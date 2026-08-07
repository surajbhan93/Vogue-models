import mongoose from 'mongoose';

const editorialSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    category: {
      type: String,
      enum: ['Magazine Cover', 'Runway Showcase', 'Brand Campaign', 'Editorial Shoot'],
      default: 'Magazine Cover',
      required: true,
    },
    image: {
      type: String,
      required: [true, 'Image URL is required'],
    },
    magazineName: {
      type: String,
      trim: true,
      default: 'Vogue',
    },
    issueDate: {
      type: String,
      default: '2026',
    },
    link: {
      type: String,
      default: '',
    },
    featured: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

editorialSchema.index({ featured: 1 });
editorialSchema.index({ createdAt: -1 });

const Editorial = mongoose.model('Editorial', editorialSchema);
export default Editorial;