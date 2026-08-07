// backend/routes/admin/admin.portfolio.routes.js
import express from 'express';
import {
  adminGetModelPortfolio,
  adminDeletePortfolioItem,
} from '../../controllers/admin/admin.portfolio.controller.js';
import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { adminOnly } from '../../middlewares/adminOnly.js';

const router = express.Router();

router.use(authMiddleware);
router.use(adminOnly);

router.get('/:modelId', adminGetModelPortfolio);
router.delete('/item/:id', adminDeletePortfolioItem);

export default router;
