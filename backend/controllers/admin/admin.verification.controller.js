// backend/controllers/admin/admin.verification.controller.js
import Verification from '../../models/Verification.js';
import Model from '../../models/Model.js';
import Notification from '../../models/Notification.js';

// 🔹 GET ALL VERIFICATION REQUESTS (Admin)
export const adminGetVerifications = async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (status) filter.status = status;

    const skip = (page - 1) * limit;
    const verifications = await Verification.find(filter)
      .populate('model', 'name email phone profileImage status')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Verification.countDocuments(filter);

    res.json({
      success: true,
      data: verifications,
      pagination: { total, page: parseInt(page), limit: parseInt(limit), pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error('Admin get verifications error:', error);
    res.status(500).json({ success: false, message: 'Failed to get verifications', error: error.message });
  }
};

// 🔹 APPROVE VERIFICATION (Admin)
export const adminApproveVerification = async (req, res) => {
  try {
    const { id } = req.params;
    const verification = await Verification.findByIdAndUpdate(
      id,
      { status: 'approved', reviewedAt: new Date(), reviewedBy: req.user._id, rejectionReason: null },
      { new: true }
    );

    if (!verification) {
      return res.status(404).json({ success: false, message: 'Verification not found' });
    }

    await Model.findByIdAndUpdate(verification.model, { isVerified: true });
    await Notification.create({
      model: verification.model,
      type: 'system',
      title: 'Verification approved',
      message: 'Your identity documents have been verified.',
    });

    res.json({ success: true, message: 'Verification approved!', verification });
  } catch (error) {
    console.error('Admin approve verification error:', error);
    res.status(500).json({ success: false, message: 'Failed to approve verification', error: error.message });
  }
};

// 🔹 REJECT VERIFICATION (Admin)
export const adminRejectVerification = async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    const verification = await Verification.findByIdAndUpdate(
      id,
      { status: 'rejected', reviewedAt: new Date(), reviewedBy: req.user._id, rejectionReason: reason || 'Documents did not pass review' },
      { new: true }
    );

    if (!verification) {
      return res.status(404).json({ success: false, message: 'Verification not found' });
    }

    await Notification.create({
      model: verification.model,
      type: 'system',
      title: 'Verification rejected',
      message: verification.rejectionReason,
    });

    res.json({ success: true, message: 'Verification rejected', verification });
  } catch (error) {
    console.error('Admin reject verification error:', error);
    res.status(500).json({ success: false, message: 'Failed to reject verification', error: error.message });
  }
};
