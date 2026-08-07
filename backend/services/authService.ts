import mongoose from 'mongoose';
import { UserRepository } from '../repositories/userRepository';
import { RoleModel } from '../database/mongodb/models/Role';
import { OTPModel } from '../database/mongodb/models/Notification';
import { ApiError } from '../utils/apiError';
import { generateTokens, verifyRefreshToken } from '../utils/jwt';

export class AuthService {
  private userRepo: UserRepository;

  constructor() {
    this.userRepo = new UserRepository();
  }

  async registerUser(data: {
    email: string;
    password: string;
    roleName: 'MODEL' | 'CLIENT';
    phoneNumber?: string;
  }) {
    const existingUser = await this.userRepo.findByEmail(data.email);
    if (existingUser) {
      throw ApiError.badRequest('User with this email already exists');
    }

    const role = await RoleModel.findOne({ name: data.roleName });
    if (!role) {
      throw ApiError.badRequest(`Role ${data.roleName} not configured`);
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const user = await this.userRepo.create(
        {
          email: data.email,
          passwordHash: data.password,
          role: role._id as any,
          roleName: data.roleName,
          phoneNumber: data.phoneNumber,
          isEmailVerified: false,
        },
        session
      );

      // Generate verification OTP
      const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
      await OTPModel.create(
        [
          {
            email: data.email,
            otp: otpCode,
            purpose: 'VERIFICATION',
            expiresAt: new Date(Date.now() + 5 * 60 * 1000),
          },
        ],
        { session }
      );

      await session.commitTransaction();
      session.endSession();

      return { user, otpCode };
    } catch (err) {
      await session.abortTransaction();
      session.endSession();
      throw err;
    }
  }

  async login(email: string, pass: string) {
    const user = await this.userRepo.findByEmailWithPassword(email);
    if (!user) {
      throw ApiError.unauthorized('Invalid email or password');
    }

    const isMatch = await user.comparePassword(pass);
    if (!isMatch) {
      throw ApiError.unauthorized('Invalid email or password');
    }

    if (!user.isActive) {
      throw ApiError.forbidden('Your account has been deactivated');
    }

    const tokens = generateTokens({
      userId: user._id.toString(),
      role: user.roleName,
      email: user.email,
    });

    user.refreshToken = tokens.refreshToken;
    user.lastLoginAt = new Date();
    await user.save();

    return { user, tokens };
  }

  async verifyOTP(email: string, otp: string) {
    const otpRecord = await OTPModel.findOne({ email: email.toLowerCase(), otp, purpose: 'VERIFICATION' });
    if (!otpRecord) {
      throw ApiError.badRequest('Invalid or expired OTP');
    }

    const user = await this.userRepo.findByEmail(email);
    if (!user) {
      throw ApiError.notFound('User not found');
    }

    user.isEmailVerified = true;
    await user.save();
    await OTPModel.deleteOne({ _id: otpRecord._id });

    return true;
  }
}
