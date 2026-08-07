// backend/routes/verification.routes.js
import { Router } from 'express';
import {
  getMyVerification,
  submitVerification,
} from '../controllers/web/verification.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

router.use(authMiddleware);

router.get('/', getMyVerification);
router.post('/', submitVerification);

export default router;
