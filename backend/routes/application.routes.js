// backend/routes/application.routes.js
import { Router } from 'express';
import {
  getMyApplications,
  applyToJob,
  withdrawApplication,
} from '../controllers/web/application.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

router.use(authMiddleware);

router.get('/', getMyApplications);
router.post('/', applyToJob);
router.patch('/:id/withdraw', withdrawApplication);

export default router;
