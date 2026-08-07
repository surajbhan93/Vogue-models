// backend/controllers/web/calendar.controller.js
import Booking from '../../models/Booking.js';
import BlockedDate from '../../models/BlockedDate.js';

// 🔹 GET CALENDAR (shoot dates + blocked dates for a month/range)
export const getCalendar = async (req, res) => {
  try {
    const { from, to } = req.query;
    const modelId = req.user._id;

    const dateFilter = {};
    if (from) dateFilter.$gte = new Date(from);
    if (to) dateFilter.$lte = new Date(to);

    const bookingFilter = { model: modelId };
    if (from || to) bookingFilter.shootDate = dateFilter;

    const blockedFilter = { model: modelId };
    if (from || to) blockedFilter.date = dateFilter;

    const [bookings, blockedDates] = await Promise.all([
      Booking.find(bookingFilter).select('shootTitle shootDate endDate status location'),
      BlockedDate.find(blockedFilter),
    ]);

    res.json({
      success: true,
      calendar: {
        shoots: bookings,
        blockedDates,
      },
    });
  } catch (error) {
    console.error('Get calendar error:', error);
    res.status(500).json({ success: false, message: 'Failed to get calendar', error: error.message });
  }
};

// 🔹 BLOCK A DATE (mark unavailable)
export const blockDate = async (req, res) => {
  try {
    const { date, reason } = req.body;

    if (!date) {
      return res.status(400).json({ success: false, message: 'date is required' });
    }

    const blocked = await BlockedDate.findOneAndUpdate(
      { model: req.user._id, date: new Date(date) },
      { $set: { reason } },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.status(201).json({ success: true, message: 'Date blocked', blocked });
  } catch (error) {
    console.error('Block date error:', error);
    res.status(500).json({ success: false, message: 'Failed to block date', error: error.message });
  }
};

// 🔹 UNBLOCK A DATE
export const unblockDate = async (req, res) => {
  try {
    const { id } = req.params;
    const blocked = await BlockedDate.findOneAndDelete({ _id: id, model: req.user._id });

    if (!blocked) {
      return res.status(404).json({ success: false, message: 'Blocked date not found' });
    }

    res.json({ success: true, message: 'Date unblocked' });
  } catch (error) {
    console.error('Unblock date error:', error);
    res.status(500).json({ success: false, message: 'Failed to unblock date', error: error.message });
  }
};
