// backend/controllers/admin/admin.portfolio.controller.js
import Portfolio from '../../models/Portfolio.js';

// 🔹 GET A MODEL'S PORTFOLIO (Admin)
export const adminGetModelPortfolio = async (req, res) => {
  try {
    const { modelId } = req.params;
    const items = await Portfolio.find({ model: modelId }).sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data: items });
  } catch (error) {
    console.error('Admin get portfolio error:', error);
    res.status(500).json({ success: false, message: 'Failed to get portfolio', error: error.message });
  }
};

// 🔹 DELETE ANY PORTFOLIO ITEM (Admin - moderation)
export const adminDeletePortfolioItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Portfolio.findByIdAndDelete(id);

    if (!item) {
      return res.status(404).json({ success: false, message: 'Portfolio item not found' });
    }

    res.json({ success: true, message: 'Portfolio item removed by admin' });
  } catch (error) {
    console.error('Admin delete portfolio error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete item', error: error.message });
  }
};
