import { Response } from 'express';

export interface MetaPagination {
  page?: number;
  limit?: number;
  total?: number;
  totalPages?: number;
}

export const sendResponse = <T>(
  res: Response,
  statusCode: number,
  message: string,
  data: T | null = null,
  meta?: MetaPagination
) => {
  return res.status(statusCode).json({
    success: statusCode >= 200 && statusCode < 300,
    message,
    data,
    meta,
  });
};
