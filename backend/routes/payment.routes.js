// backend/routes/payment.routes.js
import { Router } from 'express';
import {
  getEarningsSummary,
  getTransactionHistory,
  requestWithdrawal,
} from '../controllers/web/payment.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

router.use(authMiddleware);

router.get('/summary', getEarningsSummary);
router.get('/transactions', getTransactionHistory);
router.post('/withdraw', requestWithdrawal);

export default router;
