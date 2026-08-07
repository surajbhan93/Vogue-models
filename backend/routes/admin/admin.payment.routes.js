// backend/routes/admin/admin.payment.routes.js
import express from 'express';
import {
  adminGetEarningsOverview,
  adminGetAllTransactions,
  adminProcessWithdrawal,
} from '../../controllers/admin/admin.payment.controller.js';
import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { adminOnly } from '../../middlewares/adminOnly.js';

const router = express.Router();

router.use(authMiddleware);
router.use(adminOnly);

router.get('/overview', adminGetEarningsOverview);
router.get('/transactions', adminGetAllTransactions);
router.patch('/withdrawals/:id', adminProcessWithdrawal);

export default router;
