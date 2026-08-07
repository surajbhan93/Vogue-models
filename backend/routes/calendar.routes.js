// backend/routes/calendar.routes.js
import { Router } from 'express';
import {
  getCalendar,
  blockDate,
  unblockDate,
} from '../controllers/web/calendar.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

router.use(authMiddleware);

router.get('/', getCalendar);
router.post('/block', blockDate);
router.delete('/block/:id', unblockDate);

export default router;
