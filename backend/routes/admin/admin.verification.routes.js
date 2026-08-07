// backend/routes/admin/admin.verification.routes.js
import express from 'express';
import {
  adminGetVerifications,
  adminApproveVerification,
  adminRejectVerification,
} from '../../controllers/admin/admin.verification.controller.js';
import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { adminOnly } from '../../middlewares/adminOnly.js';

const router = express.Router();

router.use(authMiddleware);
router.use(adminOnly);

router.get('/', adminGetVerifications);
router.patch('/:id/approve', adminApproveVerification);
router.patch('/:id/reject', adminRejectVerification);

export default router;
