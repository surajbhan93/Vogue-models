// backend/controllers/web/portfolio.controller.js
import Portfolio from '../../models/Portfolio.js';
import Model from '../../models/Model.js';

// 🔹 GET PUBLIC PORTFOLIO ITEM BY SLUG (Public Route: /portfolio/:slug)
export const getPublicPortfolioBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    // Find item by slug & populate model details (name, slug, avatar, specialties)
    const item = await Portfolio.findOne({ slug })
      .populate('model', 'name slug avatar coverImage specialties gender city');
    if (!item) {
      return res.status(404).json({ success: false, message: 'Portfolio item not found' });
    }
    res.json({ success: true, data: item });
  } catch (error) {
    console.error('Get public portfolio error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch portfolio item', error: error.message });
  }
};

// 🔹 GET PUBLIC PORTFOLIO FOR A MODEL (Public Route: /models/:modelSlug/portfolio)
export const getPublicModelPortfolio = async (req, res) => {
  try {
    const { modelSlug } = req.params;
    const { type, category } = req.query;
    const model = await Model.findOne({ slug: modelSlug });
    if (!model) {
      return res.status(404).json({ success: false, message: 'Model not found' });
    }
    const filter = { model: model._id };
    if (type) filter.type = type;
    if (category) filter.category = category;
    const items = await Portfolio.find(filter).sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data: items, model });
  } catch (error) {
    console.error('Get model portfolio error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch model portfolio', error: error.message });
  }
};
// 🔹 GET MY PORTFOLIO (optional filter by type/category)
export const getMyPortfolio = async (req, res) => {
  try {
    const { type, category } = req.query;
    const filter = { model: req.user._id };
    if (type) filter.type = type;
    if (category) filter.category = category;

    const items = await Portfolio.find(filter).sort({ order: 1, createdAt: -1 });

    res.json({ success: true, data: items });
  } catch (error) {
    console.error('Get portfolio error:', error);
    res.status(500).json({ success: false, message: 'Failed to get portfolio', error: error.message });
  }
};

// 🔹 UPLOAD PORTFOLIO ITEM
// Expects `req.body.url` to already be a hosted file URL (upload handled by
// a separate file-upload middleware/service, e.g. S3/Cloudinary).
export const uploadPortfolioItem = async (req, res) => {
  try {
    const { url, type, thumbnailUrl, category, caption } = req.body;

    if (!url || !type) {
      return res.status(400).json({ success: false, message: 'url and type are required' });
    }

    const item = await Portfolio.create({
      model: req.user._id,
      url,
      type,
      thumbnailUrl: thumbnailUrl || null,
      category: category || 'Other',
      caption: caption || '',
    });

    res.status(201).json({ success: true, message: 'Media uploaded successfully!', item });
  } catch (error) {
    console.error('Upload portfolio error:', error);
    res.status(500).json({ success: false, message: 'Failed to upload media', error: error.message });
  }
};

// 🔹 UPDATE PORTFOLIO ITEM (caption/category/order)
export const updatePortfolioItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { caption, category, order } = req.body;

    const item = await Portfolio.findOneAndUpdate(
      { _id: id, model: req.user._id },
      { $set: { caption, category, order } },
      { new: true, runValidators: true }
    );

    if (!item) {
      return res.status(404).json({ success: false, message: 'Portfolio item not found' });
    }

    res.json({ success: true, message: 'Portfolio item updated!', item });
  } catch (error) {
    console.error('Update portfolio error:', error);
    res.status(500).json({ success: false, message: 'Failed to update media', error: error.message });
  }
};

// 🔹 DELETE PORTFOLIO ITEM
export const deletePortfolioItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Portfolio.findOneAndDelete({ _id: id, model: req.user._id });

    if (!item) {
      return res.status(404).json({ success: false, message: 'Portfolio item not found' });
    }

    res.json({ success: true, message: 'Media deleted successfully!' });
  } catch (error) {
    console.error('Delete portfolio error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete media', error: error.message });
  }
};

// 🔹 SET COVER IMAGE (from portfolio)
export const setCoverImage = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Portfolio.findOne({ _id: id, model: req.user._id, type: 'image' });

    if (!item) {
      return res.status(404).json({ success: false, message: 'Image not found in your portfolio' });
    }

    await Portfolio.updateMany({ model: req.user._id }, { $set: { isCover: false } });
    item.isCover = true;
    await item.save();

    res.json({ success: true, message: 'Cover image updated!', item });
  } catch (error) {
    console.error('Set cover image error:', error);
    res.status(500).json({ success: false, message: 'Failed to set cover image', error: error.message });
  }
};

