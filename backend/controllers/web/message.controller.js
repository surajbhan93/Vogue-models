// backend/controllers/web/message.controller.js
import { Conversation, Message } from '../../models/Message.js';

// 🔹 GET INBOX (list of conversations)
export const getInbox = async (req, res) => {
  try {
    const conversations = await Conversation.find({ model: req.user._id })
      .sort({ lastMessageAt: -1 });

    res.json({ success: true, data: conversations });
  } catch (error) {
    console.error('Get inbox error:', error);
    res.status(500).json({ success: false, message: 'Failed to get inbox', error: error.message });
  }
};

// 🔹 GET CONVERSATION MESSAGES
export const getConversationMessages = async (req, res) => {
  try {
    const { id } = req.params;

    const conversation = await Conversation.findOne({ _id: id, model: req.user._id });
    if (!conversation) {
      return res.status(404).json({ success: false, message: 'Conversation not found' });
    }

    const messages = await Message.find({ conversation: id }).sort({ createdAt: 1 });

    // Mark other-side messages as read
    await Message.updateMany(
      { conversation: id, senderType: 'other', isRead: false },
      { $set: { isRead: true } }
    );
    conversation.unreadCount = 0;
    await conversation.save();

    res.json({ success: true, conversation, messages });
  } catch (error) {
    console.error('Get conversation error:', error);
    res.status(500).json({ success: false, message: 'Failed to get conversation', error: error.message });
  }
};

// 🔹 SEND MESSAGE
export const sendMessage = async (req, res) => {
  try {
    const { id } = req.params; // conversation id
    const { text, fileUrl } = req.body;

    if (!text && !fileUrl) {
      return res.status(400).json({ success: false, message: 'text or fileUrl is required' });
    }

    const conversation = await Conversation.findOne({ _id: id, model: req.user._id });
    if (!conversation) {
      return res.status(404).json({ success: false, message: 'Conversation not found' });
    }

    const message = await Message.create({
      conversation: id,
      senderType: 'model',
      text,
      fileUrl: fileUrl || null,
    });

    conversation.lastMessage = text || 'Sent a file';
    conversation.lastMessageAt = new Date();
    await conversation.save();

    res.status(201).json({ success: true, message: 'Message sent', data: message });
  } catch (error) {
    console.error('Send message error:', error);
    res.status(500).json({ success: false, message: 'Failed to send message', error: error.message });
  }
};

// 🔹 START A NEW CONVERSATION (e.g. model reaching out first)
export const startConversation = async (req, res) => {
  try {
    const { participantName, participantType } = req.body;

    if (!participantName) {
      return res.status(400).json({ success: false, message: 'participantName is required' });
    }

    const conversation = await Conversation.create({
      model: req.user._id,
      participantName,
      participantType: participantType || 'agency',
    });

    res.status(201).json({ success: true, conversation });
  } catch (error) {
    console.error('Start conversation error:', error);
    res.status(500).json({ success: false, message: 'Failed to start conversation', error: error.message });
  }
};
