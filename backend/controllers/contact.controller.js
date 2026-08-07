// backend/controllers/contact.controller.js
import Contact from '../models/Contact.js';
import { ENV } from '../config/env.js';

// ============================================
// 🔹 SUBMIT CONTACT FORM (Public)
// ============================================

export const submitContact = async (req, res) => {
  try {
    const { 
      name, 
      email, 
      phone, 
      subject, 
      message, 
      category,
      modelImageUrl,
    } = req.body;

    // Validation
    if (!name || !email || !phone || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
        required: ['name', 'email', 'phone', 'subject', 'message'],
      });
    }

    // Create contact
    const contact = new Contact({
      name,
      email,
      phone,
      subject,
      message,
      category: category || 'general',
      userId: req.user?._id || null,
      ipAddress: req.ip || req.connection.remoteAddress,
      userAgent: req.headers['user-agent'],
      modelImageUrl: modelImageUrl || null,
    });

    await contact.save();

    console.log(`📧 New contact from: ${name} (${email})`);

    // TODO: Send email notification to admin
    // await sendContactEmail(contact);

    res.status(201).json({
      success: true,
      message: 'Your message has been sent successfully! We will get back to you soon.',
      data: contact,
    });

  } catch (error) {
    console.error('❌ Contact submit error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again.',
      error: error.message,
    });
  }
};

// ============================================
// 🔹 GET ALL CONTACTS (Admin)
// ============================================

export const getAllContacts = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 20, 
      status, 
      category,
      search,
      sort = '-createdAt',
    } = req.query;

    // Build filter
    const filter = {};
    if (status) filter.status = status;
    if (category) filter.category = category;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { subject: { $regex: search, $options: 'i' } },
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const contacts = await Contact.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .populate('userId', 'name email profileImage');

    const total = await Contact.countDocuments(filter);

    res.json({
      success: true,
      data: contacts,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit)),
      },
    });

  } catch (error) {
    console.error('❌ Get contacts error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get contacts',
      error: error.message,
    });
  }
};

// ============================================
// 🔹 GET SINGLE CONTACT (Admin)
// ============================================

export const getContactById = async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await Contact.findById(id)
      .populate('userId', 'name email profileImage')
      .populate('adminResponse.respondedBy', 'name email');

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found',
      });
    }

    // Mark as read
    if (!contact.isRead) {
      contact.isRead = true;
      contact.readAt = new Date();
      await contact.save();
    }

    res.json({
      success: true,
      data: contact,
    });

  } catch (error) {
    console.error('❌ Get contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get contact',
      error: error.message,
    });
  }
};

// ============================================
// 🔹 REPLY TO CONTACT (Admin)
// ============================================

export const replyContact = async (req, res) => {
  try {
    const { id } = req.params;
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: 'Reply message is required',
      });
    }

    const contact = await Contact.findById(id);
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found',
      });
    }

    // Update contact
    contact.status = 'replied';
    contact.adminResponse = {
      message: message,
      respondedAt: new Date(),
      respondedBy: req.user._id,
    };
    contact.isRead = true;
    contact.readAt = new Date();

    await contact.save();

    // TODO: Send email reply to user
    // await sendReplyEmail(contact.email, message);

    res.json({
      success: true,
      message: 'Reply sent successfully!',
      data: contact,
    });

  } catch (error) {
    console.error('❌ Reply contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send reply',
      error: error.message,
    });
  }
};

// ============================================
// 🔹 UPDATE CONTACT STATUS (Admin)
// ============================================

export const updateContactStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['pending', 'read', 'replied', 'resolved', 'spam'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Allowed: ${validStatuses.join(', ')}`,
      });
    }

    const contact = await Contact.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found',
      });
    }

    res.json({
      success: true,
      message: `Contact status updated to ${status}`,
      data: contact,
    });

  } catch (error) {
    console.error('❌ Update status error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update status',
      error: error.message,
    });
  }
};

// ============================================
// 🔹 DELETE CONTACT (Admin)
// ============================================

export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await Contact.findByIdAndDelete(id);
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found',
      });
    }

    res.json({
      success: true,
      message: 'Contact deleted successfully!',
    });

  } catch (error) {
    console.error('❌ Delete contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete contact',
      error: error.message,
    });
  }
};

// ============================================
// 🔹 GET CONTACT STATS (Admin)
// ============================================

export const getContactStats = async (req, res) => {
  try {
    const total = await Contact.countDocuments();
    const pending = await Contact.countDocuments({ status: 'pending' });
    const replied = await Contact.countDocuments({ status: 'replied' });
    const resolved = await Contact.countDocuments({ status: 'resolved' });
    const spam = await Contact.countDocuments({ status: 'spam' });

    // Today's contacts
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayCount = await Contact.countDocuments({
      createdAt: { $gte: today },
    });

    // This week
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const weekCount = await Contact.countDocuments({
      createdAt: { $gte: weekAgo },
    });

    // Categories
    const categories = await Contact.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
        },
      },
    ]);

    res.json({
      success: true,
      stats: {
        total,
        pending,
        replied,
        resolved,
        spam,
        today: todayCount,
        week: weekCount,
        categories,
        unread: await Contact.countDocuments({ isRead: false }),
      },
    });

  } catch (error) {
    console.error('❌ Get stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get stats',
      error: error.message,
    });
  }
};