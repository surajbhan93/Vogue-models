import { Schema, model, Document } from 'mongoose';
import { softDeletePlugin, ISoftDelete } from '../plugins/softDeletePlugin';

export type BookingStatusType = 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED' | 'IN_PROGRESS' | 'REJECTED';

export interface IBooking extends Document, ISoftDelete {
  bookingNumber: string;
  client: Schema.Types.ObjectId;
  model: Schema.Types.ObjectId;
  startDate: Date;
  endDate: Date;
  location: string;
  description: string;
  totalAmount: number;
  advanceAmount: number;
  status: BookingStatusType;
  cancellationReason?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const bookingSchema = new Schema<IBooking>(
  {
    bookingNumber: { type: String, required: true, unique: true, index: true },
    client: { type: Schema.Types.ObjectId, ref: 'ClientProfile', required: true, index: true },
    model: { type: Schema.Types.ObjectId, ref: 'ModelProfile', required: true, index: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    totalAmount: { type: Number, required: true, min: 0 },
    advanceAmount: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      required: true,
      enum: ['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED', 'IN_PROGRESS', 'REJECTED'],
      default: 'PENDING',
      index: true,
    },
    cancellationReason: { type: String },
    notes: { type: String },
  },
  { timestamps: true }
);

bookingSchema.plugin(softDeletePlugin);

bookingSchema.index({ client: 1, status: 1 });
bookingSchema.index({ model: 1, status: 1 });
bookingSchema.index({ startDate: 1, endDate: 1 });

export const BookingModel = model<IBooking>('Booking', bookingSchema);

export interface IBookingStatusLog extends Document {
  booking: Schema.Types.ObjectId;
  previousStatus: BookingStatusType;
  newStatus: BookingStatusType;
  changedBy: Schema.Types.ObjectId;
  reason?: string;
  createdAt: Date;
}

const bookingStatusLogSchema = new Schema<IBookingStatusLog>(
  {
    booking: { type: Schema.Types.ObjectId, ref: 'Booking', required: true, index: true },
    previousStatus: { type: String, required: true },
    newStatus: { type: String, required: true },
    changedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    reason: { type: String },
  },
  { timestamps: true }
);

export const BookingStatusLogModel = model<IBookingStatusLog>('BookingStatusLog', bookingStatusLogSchema);
