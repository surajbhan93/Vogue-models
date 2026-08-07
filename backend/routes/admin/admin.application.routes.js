// backend/routes/admin/admin.application.routes.js
import express from 'express';
import {
  adminGetAllApplications,
  adminUpdateApplicationStatus,
} from '../../controllers/admin/admin.application.controller.js';
import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { adminOnly } from '../../middlewares/adminOnly.js';

const router = express.Router();

router.use(authMiddleware);
router.use(adminOnly);

router.get('/', adminGetAllApplications);
router.patch('/:id/status', adminUpdateApplicationStatus);

export default router;
