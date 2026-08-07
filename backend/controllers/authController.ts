import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/authService';
import { sendResponse } from '../utils/apiResponse';

const authService = new AuthService();

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await authService.registerUser(req.body);
    return sendResponse(
      res,
      201,
      'Registration successful. Please verify the OTP sent to your email.',
      { userId: result.user._id, email: result.user.email, otpCode: result.otpCode }
    );
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const { user, tokens } = await authService.login(email, password);

    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return sendResponse(res, 200, 'Login successful', {
      user: {
        id: user._id,
        email: user.email,
        role: user.roleName,
      },
      accessToken: tokens.accessToken,
    });
  } catch (error) {
    next(error);
  }
};

export const verifyOTP = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, otp } = req.body;
    await authService.verifyOTP(email, otp);
    return sendResponse(res, 200, 'Email verified successfully');
  } catch (error) {
    next(error);
  }
};

export const me = async (req: Request, res: Response, next: NextFunction) => {
  try {
    return sendResponse(res, 200, 'User profile retrieved', req.user);
  } catch (error) {
    next(error);
  }
};
