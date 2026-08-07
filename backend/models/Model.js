// // backend/models/Model.js
// import mongoose from 'mongoose';
// import slugify from "slugify";
// const modelSchema = new mongoose.Schema({
//   // 🔹 Personal Information
//   name: {
//     type: String,
//     required: [true, 'Name is required'],
//     trim: true,
//   },
//   email: {
//     type: String,
//     required: [true, 'Email is required'],
//     unique: true,
//     lowercase: true,
//     trim: true,
//   },
//   password: {
//     type: String,
//     required: [true, 'Password is required'],
//     minlength: [6, 'Password must be at least 6 characters'],
//   },
//   phone: {
//     type: String,
//     required: [true, 'Phone number is required'],
//     unique: true,
//   },
//   dateOfBirth: {
//     type: Date,
//     required: true,
//   },
//   gender: {
//     type: String,
//     enum: ['Male', 'Female', 'Other'],
//     required: true,
//   },

//   // 🔹 Model Profile
//   profileImage: {
//     type: String,
//     default: null,
//   },
//   coverImage: {
//     type: String,
//     default: null,
//   },
//   bio: {
//     type: String,
//     maxlength: 500,
//   },
//   height: {
//     type: Number,
//     min: 100,
//     max: 250,
//   },
//   weight: {
//     type: Number,
//     min: 30,
//     max: 200,
//   },
//   measurements: {
//     bust: Number,
//     waist: Number,
//     hips: Number,
//   },
//   hairColor: {
//     type: String,
//     enum: ['Black', 'Brown', 'Blonde', 'Red', 'Other'],
//   },
//   eyeColor: {
//     type: String,
//     enum: ['Brown', 'Blue', 'Green', 'Hazel', 'Other'],
//   },
//   slug: {
//   type: String,
//   unique: true,
//   lowercase: true,
//   trim: true,
//   index: true,
// },
//   // 🔹 Professional Details
//   experience: {
//     type: String,
//     enum: ['Beginner', 'Intermediate', 'Professional', 'Expert'],
//     default: 'Beginner',
//   },
//   specialties: [{
//     type: String,
//     enum: ['Fashion', 'Commercial', 'Runway', 'Fitness', 'Plus Size', 'Petite', 'Editorial', 'Catalog'],
//   }],
//   languages: [String],
//   socialMedia: {
//     instagram: String,
//     twitter: String,
//     facebook: String,
//     youtube: String,
//     tiktok: String,
//   },

//   // 🔹 Availability
//   availability: {
//     type: String,
//     enum: ['Available', 'Limited', 'Busy', 'On Vacation'],
//     default: 'Available',
//   },
//   preferredLocation: {
//     city: String,
//     state: String,
//     country: String,
//   },
//   willingToTravel: {
//     type: Boolean,
//     default: false,
//   },

//   // 🔹 Account Status
//   role: {
//     type: String,
//     enum: ['model', 'admin'],
//     default: 'model',
//   },
//   isVerified: {
//     type: Boolean,
//     default: false,
//   },
//   status: {
//     type: String,
//     enum: ['pending', 'active', 'suspended', 'inactive'],
//     default: 'pending',
//   },
//   subscription: {
//     type: String,
//     enum: ['free', 'premium', 'vip'],
//     default: 'free',
//   },
//   subscriptionExpiry: Date,

//   // 🔹 Stats
//   views: {
//     type: Number,
//     default: 0,
//   },
//   likes: {
//     type: Number,
//     default: 0,
//   },
//   rating: {
//     type: Number,
//     min: 0,
//     max: 5,
//     default: 0,
//   },

//   // 🔹 System Fields
//   lastLogin: Date,
// }, {
//   timestamps: true,
// });

// // 🔹 Indexes
// modelSchema.index({ email: 1 });
// modelSchema.index({ phone: 1 });
// modelSchema.index({ status: 1 });
// modelSchema.index({ role: 1 });
// modelSchema.index({ isVerified: 1 });

// // 🔹 Remove password when sending response
// modelSchema.methods.toJSON = function () {
//   const model = this.toObject();
//   delete model.password;
//   return model;
// };

// modelSchema.pre("save", async function (next) {
//   if (!this.isModified("name") && this.slug) return next();

//   const specialty =
//     this.specialties?.length > 0
//       ? this.specialties[0].toLowerCase()
//       : "model";

//   let baseSlug = slugify(`${this.name} ${specialty}`, {
//     lower: true,
//     strict: true,
//     trim: true,
//   });

//   let slug = baseSlug;
//   let counter = 1;

//   while (
//     await mongoose.models.Model.findOne({
//       slug,
//       _id: { $ne: this._id },
//     })
//   ) {
//     slug = `${baseSlug}-${counter++}`;
//   }
//   this.slug = slug;
//   next();
// });
// const Model = mongoose.model('Model', modelSchema);
// export default Model;



import mongoose from 'mongoose';
import slugify from 'slugify';

const modelSchema = new mongoose.Schema({
  // 🔹 Talent Category & Personal Information
  category: {
    type: String,
    enum: ['Model', 'Actor', 'Singer', 'Painter', 'Dancer', 'Musician', 'Other'],
    default: 'Model',
    required: [true, 'Category is required'],
    index: true,
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    unique: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true,
  },

  // 🔹 Profile Media & Bio
  profileImage: {
    type: String,
    default: null,
  },
  coverImage: {
    type: String,
    default: null,
  },
  bio: {
    type: String,
    maxlength: 1000,
  },

  // 🔹 Physical Attributes (Optional for non-models)
  height: {
    type: Number,
    min: 50,
    max: 250,
    default: null,
  },
  weight: {
    type: Number,
    min: 20,
    max: 250,
    default: null,
  },
  measurements: {
    bust: { type: Number, default: null },
    waist: { type: Number, default: null },
    hips: { type: Number, default: null },
  },
  hairColor: {
    type: String,
    enum: ['Black', 'Brown', 'Blonde', 'Red', 'Other', 'N/A'],
    default: 'Other',
  },
  eyeColor: {
    type: String,
    enum: ['Brown', 'Blue', 'Green', 'Hazel', 'Other', 'N/A'],
    default: 'Other',
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    index: true,
  },

  // 🔹 Professional Details
  experience: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Professional', 'Expert'],
    default: 'Beginner',
  },
  specialties: [{
    type: String,
    trim: true,
  }],
  languages: [String],
  socialMedia: {
    instagram: String,
    twitter: String,
    facebook: String,
    youtube: String,
    tiktok: String,
    portfolioWebsite: String,
  },

  // 🔹 Availability & Location
  availability: {
    type: String,
    enum: ['Available', 'Limited', 'Busy', 'On Vacation'],
    default: 'Available',
  },
  preferredLocation: {
    city: String,
    state: String,
    country: String,
  },
  willingToTravel: {
    type: Boolean,
    default: false,
  },

  // 🔹 Account Status
  role: {
    type: String,
    enum: ['model', 'admin'],
    default: 'model',
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: ['pending', 'active', 'suspended', 'inactive'],
    default: 'pending',
  },
  subscription: {
    type: String,
    enum: ['free', 'premium', 'vip'],
    default: 'free',
  },
  subscriptionExpiry: Date,

  // 🔹 Engagement Stats
  views: {
    type: Number,
    default: 0,
  },
  likes: {
    type: Number,
    default: 0,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },

  // 🔹 System Fields
  lastLogin: Date,
}, {
  timestamps: true,
});

// 🔹 Indexes for fast searching
modelSchema.index({ email: 1 });
modelSchema.index({ phone: 1 });
modelSchema.index({ category: 1 });
modelSchema.index({ status: 1 });
modelSchema.index({ role: 1 });
modelSchema.index({ isVerified: 1 });

// 🔹 Remove password when sending JSON response
modelSchema.methods.toJSON = function () {
  const model = this.toObject();
  delete model.password;
  return model;
};

// 🔹 Pre-save hook to generate unique slug based on Name, Category & Specialty
modelSchema.pre("save", async function (next) {
  if (!this.isModified("name") && !this.isModified("category") && this.slug) {
    return next();
  }

  const category = this.category ? this.category.toLowerCase() : "talent";
  const specialty = this.specialties && this.specialties.length > 0
    ? this.specialties[0].toLowerCase()
    : "";

  let baseSlug = slugify(`${this.name} ${category} ${specialty}`.trim(), {
    lower: true,
    strict: true,
    trim: true,
  });

  let slug = baseSlug;
  let counter = 1;

  while (
    await mongoose.models.Model.findOne({
      slug,
      _id: { $ne: this._id },
    })
  ) {
    slug = `${baseSlug}-${counter++}`;
  }
  this.slug = slug;
  next();
});

const Model = mongoose.model('Model', modelSchema);
export default Model;