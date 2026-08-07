// backend/routes/booking.routes.js
import { Router } from 'express';
import {
  getMyBookings,
  getBookingById,
  getBookingInvoice,
} from '../controllers/web/booking.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

router.use(authMiddleware);

router.get('/', getMyBookings);
router.get('/:id', getBookingById);
router.get('/:id/invoice', getBookingInvoice);

export default router;
