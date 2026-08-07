import { Schema, model, Document, Model } from 'mongoose';
import { softDeletePlugin, ISoftDelete } from '../plugins/softDeletePlugin';
import { hashPassword, comparePassword } from '../../../utils/password';

export interface IUser extends Document, ISoftDelete {
  email: string;
  passwordHash: string;
  phoneNumber?: string;
  role: Schema.Types.ObjectId;
  roleName: 'SUPER_ADMIN' | 'ADMIN' | 'MODEL' | 'CLIENT' | 'GUEST';
  isEmailVerified: boolean;
  isActive: boolean;
  refreshToken?: string;
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidate: string): Promise<boolean>;
}

export interface IUserModel extends Model<IUser> {
  findByEmail(email: string): Promise<IUser | null>;
}

const userSchema = new Schema<IUser, IUserModel>(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    passwordHash: { type: String, required: true, select: false },
    phoneNumber: { type: String, sparse: true, trim: true },
    role: { type: Schema.Types.ObjectId, ref: 'Role', required: true },
    roleName: {
      type: String,
      required: true,
      enum: ['SUPER_ADMIN', 'ADMIN', 'MODEL', 'CLIENT', 'GUEST'],
      default: 'GUEST',
    },
    isEmailVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    refreshToken: { type: String, select: false },
    lastLoginAt: { type: Date },
  },
  { timestamps: true }
);

userSchema.plugin(softDeletePlugin);

userSchema.pre('save', async function (next) {
  if (!this.isModified('passwordHash')) return next();
  try {
    this.passwordHash = await hashPassword(this.passwordHash);
    next();
  } catch (err: any) {
    next(err);
  }
});

userSchema.methods.comparePassword = async function (candidate: string): Promise<boolean> {
  return comparePassword(candidate, this.passwordHash);
};

userSchema.statics.findByEmail = function (email: string) {
  return this.findOne({ email: email.toLowerCase() });
};

export const UserModel = model<IUser, IUserModel>('User', userSchema);
