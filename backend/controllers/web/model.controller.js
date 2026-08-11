// // backend/controllers/model.controller.js
// import Model from '../../models/Model.js';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import { ENV } from '../../config/env.js';
// import Portfolio from '../../models/Portfolio.js';
// // 🔹 REGISTER MODEL
// export const registerModel = async (req, res) => {
//   try {
//    const {
//   fullName,
//   email,
//   password,
//   phone,
//   dateOfBirth,
//   gender,
//   height,
//   weight,
//   bust,
//   waist,
//   hips,
//   specialties,
// } = req.body;

//     // Check if model exists
//     const existingModel = await Model.findOne({ 
//       $or: [{ email }, { phone }] 
//     });

//     if (existingModel) {
//       return res.status(400).json({
//         success: false,
//         message: 'Model with this email or phone already exists',
//       });
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create model
// const model = new Model({
//   name: fullName, // ✅ fullName -> name

//   email,
//   password: hashedPassword,
//   phone,
//   dateOfBirth,
//   gender,

//   // Height & Weight ko Number me convert karo
//   height: Number(height),
//   weight: parseFloat(String(weight).replace(/[^\d.]/g, "")),

//   // Frontend alag-alag fields bhej raha hai
//   measurements: {
//     bust: Number(bust),
//     waist: Number(waist),
//     hips: Number(hips),
//   },

//   specialties: specialties || [],
//   status: "pending",
// });

//     await model.save();

//     // Generate token
//     const token = jwt.sign(
//       { id: model._id, role: model.role, email: model.email },
//       ENV.JWT_SECRET,
//       { expiresIn: ENV.JWT_EXPIRES_IN || '7d' }
//     );

//     // Set cookie
//     res.cookie('token', token, {
//       httpOnly: true,
//       secure: ENV.NODE_ENV === 'production',
//       maxAge: 7 * 24 * 60 * 60 * 1000,
//       sameSite: 'lax',
//     });

//     res.status(201).json({
//       success: true,
//       message: 'Model registered successfully! Waiting for admin approval.',
//       token,
//       model: model.toJSON(),
//     });

//   } catch (error) {
//     console.error('Register error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Registration failed',
//       error: error.message,
//     });
//   }
// };

// // 🔹 LOGIN MODEL
// export const loginModel = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const model = await Model.findOne({ email });
//     if (!model) {
//       return res.status(401).json({
//         success: false,
//         message: 'Invalid email or password',
//       });
//     }

//     const isPasswordValid = await bcrypt.compare(password, model.password);
//     if (!isPasswordValid) {
//       return res.status(401).json({
//         success: false,
//         message: 'Invalid email or password',
//       });
//     }

//     if (model.status === 'suspended') {
//       return res.status(403).json({
//         success: false,
//         message: 'Your account has been suspended. Please contact admin.',
//       });
//     }

//     if (model.status === 'pending') {
//       return res.status(403).json({
//         success: false,
//         message: 'Your account is pending admin approval.',
//       });
//     }

//     model.lastLogin = new Date();
//     await model.save();

//     const token = jwt.sign(
//       { id: model._id, role: model.role, email: model.email },
//       ENV.JWT_SECRET,
//       { expiresIn: ENV.JWT_EXPIRES_IN || '7d' }
//     );

//     res.cookie('token', token, {
//       httpOnly: true,
//       secure: ENV.NODE_ENV === 'production',
//       maxAge: 7 * 24 * 60 * 60 * 1000,
//       sameSite: 'lax',
//     });

//     res.json({
//       success: true,
//       message: 'Login successful!',
//       token,
//       model: model.toJSON(),
//     });

//   } catch (error) {
//     console.error('Login error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Login failed',
//       error: error.message,
//     });
//   }
// };

// // 🔹 GET PROFILE
// export const getModelProfile = async (req, res) => {
//   try {
//     const model = await Model.findById(req.user._id);
//     if (!model) {
//       return res.status(404).json({
//         success: false,
//         message: 'Model not found',
//       });
//     }

//     res.json({
//       success: true,
//       model: model.toJSON(),
//     });

//   } catch (error) {
//     console.error('Get profile error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to get profile',
//       error: error.message,
//     });
//   }
// };

// // 🔹 UPDATE PROFILE
// export const updateModelProfile = async (req, res) => {
//   try {
//     const updates = req.body;
//     const modelId = req.user._id;

//     // Remove sensitive fields
//     delete updates.password;
//     delete updates.email;
//     delete updates.role;
//     delete updates.status;
//     delete updates.isVerified;

//     const model = await Model.findByIdAndUpdate(
//       modelId,
//       { $set: updates },
//       { new: true, runValidators: true }
//     );

//     if (!model) {
//       return res.status(404).json({
//         success: false,
//         message: 'Model not found',
//       });
//     }

//     res.json({
//       success: true,
//       message: 'Profile updated successfully!',
//       model: model.toJSON(),
//     });

//   } catch (error) {
//     console.error('Update profile error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to update profile',
//       error: error.message,
//     });
//   }
// };

// // 🔹 CHANGE PASSWORD
// export const changePassword = async (req, res) => {
//   try {
//     const { currentPassword, newPassword } = req.body;

//     const model = await Model.findById(req.user._id);
//     if (!model) {
//       return res.status(404).json({
//         success: false,
//         message: 'Model not found',
//       });
//     }

//     const isValid = await bcrypt.compare(currentPassword, model.password);
//     if (!isValid) {
//       return res.status(401).json({
//         success: false,
//         message: 'Current password is incorrect',
//       });
//     }

//     model.password = await bcrypt.hash(newPassword, 10);
//     await model.save();

//     res.json({
//       success: true,
//       message: 'Password changed successfully!',
//     });

//   } catch (error) {
//     console.error('Change password error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to change password',
//       error: error.message,
//     });
//   }
// };

// // 🔹 GET ALL MODELS (Public)
// export const getAllModels = async (req, res) => {
//   try {
//     const { 
//       page = 1, 
//       limit = 20, 
//       specialty, 
//       experience,
//       gender,
//       sort = '-createdAt',
//     } = req.query;

//     const filter = { 
//       status: 'active',
//       isVerified: true,
//     };
    
//     if (specialty) filter.specialties = specialty;
//     if (experience) filter.experience = experience;
//     if (gender) filter.gender = gender;

//     const skip = (parseInt(page) - 1) * parseInt(limit);

//     const models = await Model.find(filter)
//       .select('-password')
//       .sort(sort === 'rating' ? { rating: -1 } : { createdAt: -1 })
//       .skip(skip)
//       .limit(parseInt(limit));

//     const total = await Model.countDocuments(filter);

//     res.json({
//       success: true,
//       data: models,
//       pagination: {
//         total,
//         page: parseInt(page),
//         limit: parseInt(limit),
//         pages: Math.ceil(total / parseInt(limit)),
//       },
//     });

//   } catch (error) {
//     console.error('Get models error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to get models',
//       error: error.message,
//     });
//   }
// };

// // 🔹 GET SINGLE MODEL (Public)
// export const getModelById = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const model = await Model.findById(id).select('-password');
//     if (!model) {
//       return res.status(404).json({
//         success: false,
//         message: 'Model not found',
//       });
//     }

//     // Increment views
//     model.views += 1;
//     await model.save();

//     res.json({
//       success: true,
//       model,
//     });

//   } catch (error) {
//     console.error('Get model error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to get model',
//       error: error.message,
//     });
//   }
// };

// // 🔹 LOGOUT
// export const logoutModel = async (req, res) => {
//   try {
//     res.clearCookie('token');
//     res.json({
//       success: true,
//       message: 'Logged out successfully!',
//     });

//   } catch (error) {
//     console.error('Logout error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Logout failed',
//       error: error.message,
//     });
//   }
// };

// // 🔹 DELETE ACCOUNT
// export const deleteModel = async (req, res) => {
//   try {
//     await Model.findByIdAndDelete(req.user._id);
    
//     res.clearCookie('token');
//     res.json({
//       success: true,
//       message: 'Account deleted successfully!',
//     });

//   } catch (error) {
//     console.error('Delete account error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to delete account',
//       error: error.message,
//     });
//   }
// };


// // 🔹 GET MODEL BY SLUG (Public Route: /models/:slug)
// export const getModelBySlug = async (req, res) => {
//   try {
//     const { slug } = req.params;
//     // Find model by slug (or _id fallback if standard mongo ID)
//     let model = await Model.findOne({ slug }).select('-password');
    
//     if (!model && slug.match(/^[0-9a-fA-F]{24}$/)) {
//       model = await Model.findById(slug).select('-password');
//     }
//     if (!model) {
//       return res.status(404).json({ success: false, message: 'Model not found' });
//     }
//     // Increment profile views
//     model.views = (model.views || 0) + 1;
//     await model.save();
//     // Fetch model's portfolio items
//     const portfolio = await Portfolio.find({ model: model._id }).sort({ order: 1, createdAt: -1 });
//     res.json({
//       success: true,
//       model,
//       portfolio,
//     });
//   } catch (error) {
//     console.error('Get model by slug error:', error);
//     res.status(500).json({ success: false, message: 'Failed to get model profile', error: error.message });
//   }
// };



import Model from '../../models/Model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { ENV } from '../../config/env.js';
import Portfolio from '../../models/Portfolio.js';

// 🔹 REGISTER TALENT (Model / Actor / Singer / Painter / etc.)
export const registerModel = async (req, res) => {
  try {
    const {
      fullName,
      email,
      password,
      phone,
      dateOfBirth,
      gender,
      category,
      height,
      weight,
      bust,
      waist,
      hips,
      specialties,
      bio,
      experience,
    } = req.body;

    // Check if user exists with email or phone
    const existingModel = await Model.findOne({ 
      $or: [{ email }, { phone }] 
    });

    if (existingModel) {
      return res.status(400).json({
        success: false,
        message: 'Account with this email or phone number already exists',
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Parse height, weight and measurements safely
    const parsedHeight = height ? Number(height) : null;
    const parsedWeight = weight ? parseFloat(String(weight).replace(/[^\d.]/g, "")) : null;
    const parsedBust = bust ? Number(bust) : null;
    const parsedWaist = waist ? Number(waist) : null;
    const parsedHips = hips ? Number(hips) : null;

    // Create talent record
    const model = new Model({
      name: fullName,
      email,
      password: hashedPassword,
      phone,
      dateOfBirth,
      gender,
      category: category || 'Model',
      bio: bio || '',
      experience: experience || 'Beginner',
      height: parsedHeight,
      weight: parsedWeight,
      measurements: {
        bust: parsedBust,
        waist: parsedWaist,
        hips: parsedHips,
      },
      specialties: specialties || [],
      status: "pending",
    });

    await model.save();

    // Generate JWT Token
    const token = jwt.sign(
      { id: model._id, role: model.role, email: model.email },
      ENV.JWT_SECRET,
      { expiresIn: ENV.JWT_EXPIRES_IN || '7d' }
    );

    // Set HTTP-only Cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: ENV.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: 'lax',
    });

    res.status(201).json({
      success: true,
      message: 'Registration successful! Waiting for admin approval.',
      token,
      model: model.toJSON(),
    });

  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({
      success: false,
      message: 'Registration failed',
      error: error.message,
    });
  }
};

// 🔹 LOGIN TALENT
export const loginModel = async (req, res) => {
  try {
    const { email, password } = req.body;

    const model = await Model.findOne({ email });
    if (!model) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    const isPasswordValid = await bcrypt.compare(password, model.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    if (model.status === 'suspended') {
      return res.status(403).json({
        success: false,
        message: 'Your account has been suspended. Please contact admin.',
      });
    }

    if (model.status === 'pending') {
      return res.status(403).json({
        success: false,
        message: 'Your account is pending admin approval.',
      });
    }

    model.lastLogin = new Date();
    await model.save();

    const token = jwt.sign(
      { id: model._id, role: model.role, email: model.email },
      ENV.JWT_SECRET,
      { expiresIn: ENV.JWT_EXPIRES_IN || '7d' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: ENV.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: 'lax',
    });

    res.json({
      success: true,
      message: 'Login successful!',
      token,
      model: model.toJSON(),
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed',
      error: error.message,
    });
  }
};

// 🔹 GET CURRENT USER PROFILE
export const getModelProfile = async (req, res) => {
  try {
    const model = await Model.findById(req.user._id);
    if (!model) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found',
      });
    }

    res.json({
      success: true,
      model: model.toJSON(),
    });

  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get profile',
      error: error.message,
    });
  }
};

// 🔹 UPDATE CURRENT USER PROFILE
export const updateModelProfile = async (req, res) => {
  try {
    const updates = req.body;
    const modelId = req.user._id;

    // Prevent modifying sensitive system fields
    delete updates.password;
    delete updates.email;
    delete updates.role;
    delete updates.status;
    delete updates.isVerified;

    const model = await Model.findByIdAndUpdate(
      modelId,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!model) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found',
      });
    }

    res.json({
      success: true,
      message: 'Profile updated successfully!',
      model: model.toJSON(),
    });

  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update profile',
      error: error.message,
    });
  }
};

// 🔹 CHANGE PASSWORD
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const model = await Model.findById(req.user._id);
    if (!model) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    const isValid = await bcrypt.compare(currentPassword, model.password);
    if (!isValid) {
      return res.status(401).json({
        success: false,
        message: 'Current password is incorrect',
      });
    }

    model.password = await bcrypt.hash(newPassword, 10);
    await model.save();

    res.json({
      success: true,
      message: 'Password changed successfully!',
    });

  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to change password',
      error: error.message,
    });
  }
};

// 🔹 GET ALL TALENTS (Public with Category, Specialty, Gender & Search Filters)
export const getAllModels = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 50,
      category, 
      specialty, 
      experience,
      gender,
      search,
      sort = '-createdAt',
    } = req.query;

    const filter = { 
      status: { $ne: 'suspended' },
    };
    
    // Category filter (Case-insensitive match for category pages: /models, /actors, /singers, etc.)
    if (category && category.toLowerCase() !== 'all') {
      filter.category = new RegExp(`^${category}$`, 'i');
    }
    if (specialty) filter.specialties = specialty;
    if (experience && experience.toLowerCase() !== 'all') filter.experience = experience;
    if (gender && gender.toLowerCase() !== 'all') filter.gender = gender;

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { bio: { $regex: search, $options: "i" } },
        { specialties: { $regex: search, $options: "i" } },
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const models = await Model.find(filter)
      .select('-password')
      .sort(sort === 'rating' ? { rating: -1 } : { createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Model.countDocuments(filter);

    res.json({
      success: true,
      data: models,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit)),
      },
    });

  } catch (error) {
    console.error('Get models error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get models/talents',
      error: error.message,
    });
  }
};

// 🔹 GET SINGLE TALENT BY ID (Public)
export const getModelById = async (req, res) => {
  try {
    const { id } = req.params;

    const model = await Model.findById(id).select('-password');
    if (!model) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found',
      });
    }

    // Increment profile views
    model.views = (model.views || 0) + 1;
    await model.save();

    res.json({
      success: true,
      model,
    });

  } catch (error) {
    console.error('Get model error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get profile',
      error: error.message,
    });
  }
};

// 🔹 GET SINGLE TALENT BY SLUG (Public Route: /models/:slug)
export const getModelBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    
    // Find talent by slug (or _id fallback if valid ObjectId)
    let model = await Model.findOne({ slug }).select('-password');
    
    if (!model && slug.match(/^[0-9a-fA-F]{24}$/)) {
      model = await Model.findById(slug).select('-password');
    }
    if (!model) {
      return res.status(404).json({ success: false, message: 'Profile not found' });
    }

    // Increment profile views
    model.views = (model.views || 0) + 1;
    await model.save();

    // Fetch portfolio items if Portfolio model exists
    const portfolio = await Portfolio.find({ model: model._id }).sort({ order: 1, createdAt: -1 });
    
    res.json({
      success: true,
      model,
      portfolio,
    });
  } catch (error) {
    console.error('Get model by slug error:', error);
    res.status(500).json({ success: false, message: 'Failed to get profile', error: error.message });
  }
};

// 🔹 LOGOUT
export const logoutModel = async (req, res) => {
  try {
    res.clearCookie('token');
    res.json({
      success: true,
      message: 'Logged out successfully!',
    });

  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      message: 'Logout failed',
      error: error.message,
    });
  }
};

// 🔹 DELETE ACCOUNT
export const deleteModel = async (req, res) => {
  try {
    await Model.findByIdAndDelete(req.user._id);
    
    res.clearCookie('token');
    res.json({
      success: true,
      message: 'Account deleted successfully!',
    });

  } catch (error) {
    console.error('Delete account error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete account',
      error: error.message,
    });
  }
};
