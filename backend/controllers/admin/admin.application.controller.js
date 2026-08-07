// backend/controllers/admin/admin.application.controller.js
import JobApplication from '../../models/JobApplication.js';

// 🔹 GET ALL APPLICATIONS (Admin)
export const adminGetAllApplications = async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (status) filter.status = status;

    const skip = (page - 1) * limit;
    const applications = await JobApplication.find(filter)
      .populate('model', 'name email profileImage')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await JobApplication.countDocuments(filter);

    res.json({
      success: true,
      data: applications,
      pagination: { total, page: parseInt(page), limit: parseInt(limit), pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error('Admin get applications error:', error);
    res.status(500).json({ success: false, message: 'Failed to get applications', error: error.message });
  }
};

// 🔹 UPDATE APPLICATION STATUS (Admin - accept/reject on behalf of a job/agency)
export const adminUpdateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['pending', 'accepted', 'rejected'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status value' });
    }

    const application = await JobApplication.findByIdAndUpdate(
      id,
      { status, respondedAt: new Date() },
      { new: true }
    );

    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    res.json({ success: true, message: `Application ${status}!`, application });
  } catch (error) {
    console.error('Admin update application error:', error);
    res.status(500).json({ success: false, message: 'Failed to update application', error: error.message });
  }
};
