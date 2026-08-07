import { Request, Response, NextFunction } from 'express';
import { ModelRepository } from '../repositories/modelRepository';
import { BookingService } from '../services/bookingService';
import { sendResponse } from '../utils/apiResponse';

const modelRepo = new ModelRepository();
const bookingService = new BookingService();

export const getModels = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { gender, city, category, isFeatured, query, page, limit } = req.query;
    const result = await modelRepo.searchModels({
      gender: gender as string,
      city: city as string,
      category: category as string,
      isFeatured: isFeatured === 'true',
      query: query as string,
      page: Number(page) || 1,
      limit: Number(limit) || 10,
    });

    return sendResponse(res, 200, 'Models retrieved successfully', result.data, {
      page: result.page,
      limit: Number(limit) || 10,
      total: result.total,
      totalPages: result.totalPages,
    });
  } catch (error) {
    next(error);
  }
};

export const getModelById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const model = await modelRepo.findById(req.params.id, ['categories', 'user']);
    if (!model) return sendResponse(res, 404, 'Model profile not found');
    return sendResponse(res, 200, 'Model details retrieved', model);
  } catch (error) {
    next(error);
  }
};

export const createBooking = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const booking = await bookingService.createBooking({
      userId: req.user!.userId,
      ...req.body,
    });
    return sendResponse(res, 201, 'Booking request submitted successfully', booking);
  } catch (error) {
    next(error);
  }
};
