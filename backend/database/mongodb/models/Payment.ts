import { Schema, model, Document } from 'mongoose';
import { softDeletePlugin, ISoftDelete } from '../plugins/softDeletePlugin';

export type PaymentStatusType = 'PENDING' | 'SUCCESSFUL' | 'FAILED' | 'REFUNDED' | 'PARTIALLY_REFUNDED';
export type PaymentTypeEnum = 'BOOKING_ADVANCE' | 'BOOKING_FINAL' | 'REGISTRATION_FEE' | 'MEMBERSHIP_FEE';

export interface IPayment extends Document, ISoftDelete {
  paymentNumber: string;
  user: Schema.Types.ObjectId;
  booking?: Schema.Types.ObjectId;
  amount: number;
  currency: string;
  paymentType: PaymentTypeEnum;
  status: PaymentStatusType;
  razorpayOrderId: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;
  refundId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const paymentSchema = new Schema<IPayment>(
  {
    paymentNumber: { type: String, required: true, unique: true, index: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    booking: { type: Schema.Types.ObjectId, ref: 'Booking', index: true },
    amount: { type: Number, required: true, min: 0 },
    currency: { type: String, default: 'INR' },
    paymentType: {
      type: String,
      required: true,
      enum: ['BOOKING_ADVANCE', 'BOOKING_FINAL', 'REGISTRATION_FEE', 'MEMBERSHIP_FEE'],
    },
    status: {
      type: String,
      required: true,
      enum: ['PENDING', 'SUCCESSFUL', 'FAILED', 'REFUNDED', 'PARTIALLY_REFUNDED'],
      default: 'PENDING',
      index: true,
    },
    razorpayOrderId: { type: String, required: true, unique: true, index: true },
    razorpayPaymentId: { type: String, sparse: true },
    razorpaySignature: { type: String },
    refundId: { type: String },
  },
  { timestamps: true }
);

paymentSchema.plugin(softDeletePlugin);

export const PaymentModel = model<IPayment>('Payment', paymentSchema);

export interface ITransaction extends Document, ISoftDelete {
  payment: Schema.Types.ObjectId;
  amount: number;
  type: 'CREDIT' | 'DEBIT' | 'REFUND';
  description: string;
  createdAt: Date;
}

const transactionSchema = new Schema<ITransaction>(
  {
    payment: { type: Schema.Types.ObjectId, ref: 'Payment', required: true, index: true },
    amount: { type: Number, required: true },
    type: { type: String, required: true, enum: ['CREDIT', 'DEBIT', 'REFUND'] },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

transactionSchema.plugin(softDeletePlugin);

export const TransactionModel = model<ITransaction>('Transaction', transactionSchema);

export interface IInvoice extends Document, ISoftDelete {
  invoiceNumber: string;
  client: Schema.Types.ObjectId;
  booking: Schema.Types.ObjectId;
  subtotal: number;
  tax: number;
  totalAmount: number;
  pdfUrl?: string;
  dueDate: Date;
  isPaid: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const invoiceSchema = new Schema<IInvoice>(
  {
    invoiceNumber: { type: String, required: true, unique: true, index: true },
    client: { type: Schema.Types.ObjectId, ref: 'ClientProfile', required: true, index: true },
    booking: { type: Schema.Types.ObjectId, ref: 'Booking', required: true, unique: true, index: true },
    subtotal: { type: Number, required: true, min: 0 },
    tax: { type: Number, required: true, min: 0 },
    totalAmount: { type: Number, required: true, min: 0 },
    pdfUrl: { type: String },
    dueDate: { type: Date, required: true },
    isPaid: { type: Boolean, default: false, index: true },
  },
  { timestamps: true }
);

invoiceSchema.plugin(softDeletePlugin);

export const InvoiceModel = model<IInvoice>('Invoice', invoiceSchema);
