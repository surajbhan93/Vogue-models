// backend/controllers/web/application.controller.js
import JobApplication from '../../models/JobApplication.js';

// 🔹 GET MY APPLICATIONS
export const getMyApplications = async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const filter = { model: req.user._id };
    if (status) filter.status = status;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const applications = await JobApplication.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await JobApplication.countDocuments(filter);

    res.json({
      success: true,
      data: applications,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    console.error('Get applications error:', error);
    res.status(500).json({ success: false, message: 'Failed to get applications', error: error.message });
  }
};

// 🔹 APPLY TO A JOB
export const applyToJob = async (req, res) => {
  try {
    const { jobId, jobTitle, agencyName, description, location, shootDate, budget } = req.body;

    if (!jobTitle) {
      return res.status(400).json({ success: false, message: 'jobTitle is required' });
    }

    const application = await JobApplication.create({
      model: req.user._id,
      jobId: jobId || undefined,
      jobTitle,
      agencyName,
      description,
      location,
      shootDate,
      budget,
      status: 'pending',
    });

    res.status(201).json({ success: true, message: 'Application submitted!', application });
  } catch (error) {
    console.error('Apply to job error:', error);
    res.status(500).json({ success: false, message: 'Failed to submit application', error: error.message });
  }
};

// 🔹 WITHDRAW APPLICATION
export const withdrawApplication = async (req, res) => {
  try {
    const { id } = req.params;

    const application = await JobApplication.findOne({ _id: id, model: req.user._id });
    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    if (application.status !== 'pending') {
      return res.status(400).json({ success: false, message: 'Only pending applications can be withdrawn' });
    }

    application.status = 'withdrawn';
    application.respondedAt = new Date();
    await application.save();

    res.json({ success: true, message: 'Application withdrawn', application });
  } catch (error) {
    console.error('Withdraw application error:', error);
    res.status(500).json({ success: false, message: 'Failed to withdraw application', error: error.message });
  }
};
