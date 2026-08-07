import mongoose from 'mongoose';
import { BookingRepository } from '../repositories/bookingRepository';
import { ModelProfileModel } from '../database/mongodb/models/ModelProfile';
import { ClientProfileModel } from '../database/mongodb/models/ClientProfile';
import { NotificationModel } from '../database/mongodb/models/Notification';
import { ApiError } from '../utils/apiError';

export class BookingService {
  private bookingRepo: BookingRepository;

  constructor() {
    this.bookingRepo = new BookingRepository();
  }

  async createBooking(data: {
    userId: string;
    modelId: string;
    startDate: string;
    endDate: string;
    location: string;
    description: string;
    totalAmount: number;
  }) {
    const client = await ClientProfileModel.findOne({ user: data.userId });
    if (!client) {
      throw ApiError.forbidden('Only registered clients can submit hire requests');
    }

    const model = await ModelProfileModel.findById(data.modelId);
    if (!model || !model.isApproved) {
      throw ApiError.notFound('Model not found or not active');
    }

    const start = new Date(data.startDate);
    const end = new Date(data.endDate);
    if (start >= end) {
      throw ApiError.badRequest('End date must be after start date');
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const bookingNumber = `BK-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`;
      const advanceAmount = data.totalAmount * 0.3; // 30% advance deposit requirement

      const booking = await this.bookingRepo.create(
        {
          bookingNumber,
          client: client._id as any,
          model: model._id as any,
          startDate: start,
          endDate: end,
          location: data.location,
          description: data.description,
          totalAmount: data.totalAmount,
          advanceAmount,
          status: 'PENDING',
        },
        session
      );

      // Trigger notification for the model
      await NotificationModel.create(
        [
          {
            user: model.user,
            title: 'New Booking Request',
            message: `You have received a new booking request (${bookingNumber}) from ${client.companyName}`,
            type: 'BOOKING',
            metadata: { bookingId: booking._id },
          },
        ],
        { session }
      );

      await session.commitTransaction();
      session.endSession();

      return booking;
    } catch (err) {
      await session.abortTransaction();
      session.endSession();
      throw err;
    }
  }

  async updateStatus(bookingId: string, status: 'CONFIRMED' | 'REJECTED' | 'CANCELLED', userId: string) {
    const booking = await this.bookingRepo.findById(bookingId);
    if (!booking) throw ApiError.notFound('Booking not found');

    booking.status = status;
    await booking.save();

    return booking;
  }
}
