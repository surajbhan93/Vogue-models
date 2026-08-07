// backend/controllers/web/booking.controller.js
import Booking from '../../models/Booking.js';

// 🔹 GET MY BOOKINGS
export const getMyBookings = async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const filter = { model: req.user._id };
    if (status) filter.status = status;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const bookings = await Booking.find(filter)
      .sort({ shootDate: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Booking.countDocuments(filter);

    res.json({
      success: true,
      data: bookings,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({ success: false, message: 'Failed to get bookings', error: error.message });
  }
};

// 🔹 GET SINGLE BOOKING DETAILS
export const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findOne({ _id: id, model: req.user._id });

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    res.json({ success: true, booking });
  } catch (error) {
    console.error('Get booking error:', error);
    res.status(500).json({ success: false, message: 'Failed to get booking', error: error.message });
  }
};

// 🔹 DOWNLOAD INVOICE (returns invoice URL — actual PDF generation is a
// separate service/job; this endpoint just exposes the stored link)
export const getBookingInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findOne({ _id: id, model: req.user._id });

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    if (!booking.invoiceUrl) {
      return res.status(404).json({ success: false, message: 'Invoice not available for this booking yet' });
    }

    res.json({ success: true, invoiceUrl: booking.invoiceUrl });
  } catch (error) {
    console.error('Get invoice error:', error);
    res.status(500).json({ success: false, message: 'Failed to get invoice', error: error.message });
  }
};
