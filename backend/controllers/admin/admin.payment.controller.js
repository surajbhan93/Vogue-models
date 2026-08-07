// backend/controllers/admin/admin.payment.controller.js
// import Payment from '../../models/Payment.js';

// backend/controllers/admin/admin.payment.controller.js
import Payment from '../../models/Payment.js';

// 🔹 GET PLATFORM-WIDE EARNINGS OVERVIEW (Admin)
export const adminGetEarningsOverview = async (req, res) => {
  try {
    const [totalEarnings, totalWithdrawn, pendingWithdrawals] = await Promise.all([
      Payment.aggregate([
        {
          $match: {
            type: { $in: ['earning', 'contest_participation', 'contest_fee', 'subscription', 'booking'] },
            status: { $in: ['completed', 'paid'] },
          },
        },
        { $group: { _id: null, total: { $sum: '$amount' } } },
      ]),
      Payment.aggregate([
        {
          $match: {
            type: 'withdrawal',
            status: { $in: ['completed', 'paid'] },
          },
        },
        { $group: { _id: null, total: { $sum: '$amount' } } },
      ]),
      Payment.countDocuments({ type: 'withdrawal', status: 'pending' }),
    ]);

    res.json({
      success: true,
      overview: {
        totalEarnings: totalEarnings[0]?.total || 0,
        totalWithdrawn: totalWithdrawn[0]?.total || 0,
        pendingWithdrawals,
      },
    });
  } catch (error) {
    console.error('Admin earnings overview error:', error);
    res.status(500).json({ success: false, message: 'Failed to get earnings overview', error: error.message });
  }
};
// backend/controllers/admin/admin.payment.controller.js
// import Payment from '../../models/Payment.js';

// 🔹 GET ALL TRANSACTIONS (Admin) — Populates Model & Contest Details
export const adminGetAllTransactions = async (req, res) => {
  try {
    const { type, status, page = 1, limit = 50 } = req.query;
    const filter = {};
    if (type && type !== 'all') filter.type = type;
    if (status && status !== 'all') filter.status = status;

    const skip = (page - 1) * limit;
    const transactions = await Payment.find(filter)
      .populate('model', 'name email phone profileImage')
      .populate('relatedContest', 'title slug bannerImage location') // 👈 Populates Contest Title & Slug
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Payment.countDocuments(filter);

    res.json({
      success: true,
      data: transactions,
      pagination: { total, page: parseInt(page), limit: parseInt(limit), pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error('Admin get transactions error:', error);
    res.status(500).json({ success: false, message: 'Failed to get transactions', error: error.message });
  }
};
// 🔹 APPROVE / PROCESS A WITHDRAWAL (Admin)
export const adminProcessWithdrawal = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // 'completed' or 'failed'

    if (!['completed', 'failed'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status value' });
    }

    const payment = await Payment.findOneAndUpdate(
      { _id: id, type: 'withdrawal' },
      { status, processedAt: new Date() },
      { new: true }
    );

    if (!payment) {
      return res.status(404).json({ success: false, message: 'Withdrawal not found' });
    }

    res.json({ success: true, message: `Withdrawal ${status}!`, payment });
  } catch (error) {
    console.error('Admin process withdrawal error:', error);
    res.status(500).json({ success: false, message: 'Failed to process withdrawal', error: error.message });
  }
};
