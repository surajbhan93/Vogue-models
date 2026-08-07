// backend/controllers/web/payment.controller.js
import Payment from '../../models/Payment.js';

// 🔹 GET MY EARNINGS SUMMARY
export const getEarningsSummary = async (req, res) => {
  try {
    const modelId = req.user._id;

    const [totalEarned, pending, totalWithdrawn] = await Promise.all([
      Payment.aggregate([
        { $match: { model: modelId, type: 'earning', status: 'completed' } },
        { $group: { _id: null, total: { $sum: '$amount' } } },
      ]),
      Payment.aggregate([
        { $match: { model: modelId, type: 'earning', status: 'pending' } },
        { $group: { _id: null, total: { $sum: '$amount' } } },
      ]),
      Payment.aggregate([
        { $match: { model: modelId, type: 'withdrawal', status: 'completed' } },
        { $group: { _id: null, total: { $sum: '$amount' } } },
      ]),
    ]);

    const totalEarnedAmount = totalEarned[0]?.total || 0;
    const pendingAmount = pending[0]?.total || 0;
    const totalWithdrawnAmount = totalWithdrawn[0]?.total || 0;

    res.json({
      success: true,
      summary: {
        totalEarned: totalEarnedAmount,
        pendingPayments: pendingAmount,
        totalWithdrawn: totalWithdrawnAmount,
        availableBalance: totalEarnedAmount - totalWithdrawnAmount,
      },
    });
  } catch (error) {
    console.error('Get earnings summary error:', error);
    res.status(500).json({ success: false, message: 'Failed to get earnings summary', error: error.message });
  }
};

// 🔹 GET TRANSACTION HISTORY
export const getTransactionHistory = async (req, res) => {
  try {
    const { type, status, page = 1, limit = 20 } = req.query;
    const filter = { model: req.user._id };
    if (type) filter.type = type;
    if (status) filter.status = status;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const transactions = await Payment.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Payment.countDocuments(filter);

    res.json({
      success: true,
      data: transactions,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    console.error('Get transaction history error:', error);
    res.status(500).json({ success: false, message: 'Failed to get transactions', error: error.message });
  }
};

// 🔹 REQUEST WITHDRAWAL
export const requestWithdrawal = async (req, res) => {
  try {
    const { amount, method } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ success: false, message: 'Valid amount is required' });
    }

    const withdrawal = await Payment.create({
      model: req.user._id,
      type: 'withdrawal',
      amount,
      method: method || 'bank_transfer',
      status: 'pending',
    });

    res.status(201).json({
      success: true,
      message: 'Withdrawal request submitted!',
      withdrawal,
    });
  } catch (error) {
    console.error('Request withdrawal error:', error);
    res.status(500).json({ success: false, message: 'Failed to request withdrawal', error: error.message });
  }
};
