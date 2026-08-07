// backend/controllers/web/dashboard.controller.js
import Model from '../../models/Model.js';
import JobApplication from '../../models/JobApplication.js';
import Booking from '../../models/Booking.js';
import Notification from '../../models/Notification.js';
import Verification from '../../models/Verification.js';

// 🔹 Calculate profile completion percentage
const PROFILE_FIELDS = [
  'profileImage', 'coverImage', 'bio', 'height', 'weight',
  'hairColor', 'eyeColor', 'experience', 'preferredLocation',
];

function calculateProfileCompletion(model) {
  let filled = 0;
  const total = PROFILE_FIELDS.length + 2; // +measurements +specialties

  PROFILE_FIELDS.forEach((field) => {
    const value = model[field];
    if (value && (typeof value !== 'object' || Object.keys(value).length > 0)) {
      filled += 1;
    }
  });

  if (model.measurements && (model.measurements.bust || model.measurements.waist || model.measurements.hips)) {
    filled += 1;
  }
  if (model.specialties && model.specialties.length > 0) {
    filled += 1;
  }

  return Math.round((filled / total) * 100);
}

// 🔹 GET DASHBOARD HOME SUMMARY
export const getDashboardSummary = async (req, res) => {
  try {
    const modelId = req.user._id;

    const model = await Model.findById(modelId);
    if (!model) {
      return res.status(404).json({ success: false, message: 'Model not found' });
    }

    const [
      totalApplications,
      pendingApplications,
      totalBookings,
      upcomingShoot,
      unreadNotifications,
      recentNotifications,
      verification,
    ] = await Promise.all([
      JobApplication.countDocuments({ model: modelId }),
      JobApplication.countDocuments({ model: modelId, status: 'pending' }),
      Booking.countDocuments({ model: modelId }),
      Booking.findOne({ model: modelId, status: 'upcoming', shootDate: { $gte: new Date() } })
        .sort({ shootDate: 1 }),
      Notification.countDocuments({ model: modelId, isRead: false }),
      Notification.find({ model: modelId }).sort({ createdAt: -1 }).limit(5),
      Verification.findOne({ model: modelId }),
    ]);

    res.json({
      success: true,
      dashboard: {
        welcomeName: model.name,
        profileCompletion: calculateProfileCompletion(model),
        verificationStatus: verification ? verification.status : 'pending',
        isVerified: model.isVerified,
        accountStatus: model.status,
        totalApplications,
        pendingApplications,
        totalBookings,
        upcomingShoot,
        unreadNotifications,
        recentNotifications,
      },
    });
  } catch (error) {
    console.error('Dashboard summary error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to load dashboard',
      error: error.message,
    });
  }
};
