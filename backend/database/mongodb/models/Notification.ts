import { Schema, model, Document } from 'mongoose';

export interface INotification extends Document {
  user: Schema.Types.ObjectId;
  title: string;
  message: string;
  type: 'BOOKING' | 'PAYMENT' | 'SYSTEM' | 'ACCOUNT';
  isRead: boolean;
  metadata?: Record<string, any>;
  createdAt: Date;
}

const notificationSchema = new Schema<INotification>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    type: {
      type: String,
      required: true,
      enum: ['BOOKING', 'PAYMENT', 'SYSTEM', 'ACCOUNT'],
    },
    isRead: { type: Boolean, default: false, index: true },
    metadata: { type: Object, default: {} },
  },
  { timestamps: true }
);

notificationSchema.index({ user: 1, isRead: 1 });

export const NotificationModel = model<INotification>('Notification', notificationSchema);

export interface IActivityLog extends Document {
  user?: Schema.Types.ObjectId;
  action: string;
  description: string;
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
}

const activityLogSchema = new Schema<IActivityLog>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', index: true },
    action: { type: String, required: true },
    description: { type: String, required: true },
    ipAddress: { type: String },
    userAgent: { type: String },
  },
  { timestamps: true }
);

export const ActivityLogModel = model<IActivityLog>('ActivityLog', activityLogSchema);

export interface IAuditLog extends Document {
  user?: Schema.Types.ObjectId;
  role?: string;
  action: string;
  resource: string;
  ipAddress?: string;
  details?: Record<string, any>;
  createdAt: Date;
}

const auditLogSchema = new Schema<IAuditLog>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', index: true },
    role: { type: String },
    action: { type: String, required: true },
    resource: { type: String, required: true },
    ipAddress: { type: String },
    details: { type: Object },
  },
  { timestamps: true }
);

export const AuditLogModel = model<IAuditLog>('AuditLog', auditLogSchema);

export interface IOTP extends Document {
  email: string;
  otp: string;
  purpose: 'VERIFICATION' | 'PASSWORD_RESET' | 'LOGIN';
  expiresAt: Date;
}

const otpSchema = new Schema<IOTP>(
  {
    email: { type: String, required: true, index: true, lowercase: true },
    otp: { type: String, required: true },
    purpose: {
      type: String,
      required: true,
      enum: ['VERIFICATION', 'PASSWORD_RESET', 'LOGIN'],
    },
    expiresAt: { type: Date, required: true, expires: 0 }, // TTL index
  },
  { timestamps: true }
);

export const OTPModel = model<IOTP>('OTP', otpSchema);

export interface IEmailLog extends Document {
  to: string;
  subject: string;
  template: string;
  status: 'SENT' | 'FAILED';
  error?: string;
  createdAt: Date;
}

const emailLogSchema = new Schema<IEmailLog>(
  {
    to: { type: String, required: true, index: true },
    subject: { type: String, required: true },
    template: { type: String, required: true },
    status: { type: String, required: true, enum: ['SENT', 'FAILED'] },
    error: { type: String },
  },
  { timestamps: true }
);

export const EmailLogModel = model<IEmailLog>('EmailLog', emailLogSchema);
