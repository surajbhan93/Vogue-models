import Editorial from '../models/Editorial.js';

// 🔹 GET ALL EDITORIALS (Public)
export const getPublicEditorials = async (req, res) => {
  try {
    const editorials = await Editorial.find({ featured: true })
      .sort({ order: 1, createdAt: -1 })
      .limit(20);

    res.json({
      success: true,
      data: editorials,
    });
  } catch (error) {
    console.error('Get editorials error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch editorials',
      error: error.message,
    });
  }
};

// 🔹 CREATE EDITORIAL (Admin Only)
export const createEditorial = async (req, res) => {
  try {
    const { title, category, image, magazineName, issueDate, link, featured, order } = req.body;

    if (!title || !image) {
      return res.status(400).json({
        success: false,
        message: 'Title and image are required',
      });
    }

    const editorial = new Editorial({
      title,
      category: category || 'Magazine Cover',
      image,
      magazineName: magazineName || 'Vogue',
      issueDate: issueDate || '2026',
      link: link || '',
      featured: featured !== undefined ? featured : true,
      order: order ? Number(order) : 0,
    });

    await editorial.save();

    res.status(201).json({
      success: true,
      message: 'Editorial item created successfully!',
      editorial,
    });
  } catch (error) {
    console.error('Create editorial error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create editorial item',
      error: error.message,
    });
  }
};

// 🔹 UPDATE EDITORIAL (Admin Only)
export const updateEditorial = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const editorial = await Editorial.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!editorial) {
      return res.status(404).json({
        success: false,
        message: 'Editorial item not found',
      });
    }

    res.json({
      success: true,
      message: 'Editorial item updated successfully!',
      editorial,
    });
  } catch (error) {
    console.error('Update editorial error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update editorial item',
      error: error.message,
    });
  }
};

// 🔹 DELETE EDITORIAL (Admin Only)
export const deleteEditorial = async (req, res) => {
  try {
    const { id } = req.params;

    const editorial = await Editorial.findByIdAndDelete(id);
    if (!editorial) {
      return res.status(404).json({
        success: false,
        message: 'Editorial item not found',
      });
    }

    res.json({
      success: true,
      message: 'Editorial item deleted successfully!',
    });
  } catch (error) {
    console.error('Delete editorial error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete editorial item',
      error: error.message,
    });
  }
};