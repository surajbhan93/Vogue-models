// backend/routes/portfolio.routes.js
import { Router } from 'express';
import {
  getMyPortfolio,
  uploadPortfolioItem,
  updatePortfolioItem,
  deletePortfolioItem,
  setCoverImage,
} from '../controllers/web/portfolio.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

router.use(authMiddleware);

router.get('/', getMyPortfolio);
router.post('/', uploadPortfolioItem);
router.put('/:id', updatePortfolioItem);
router.delete('/:id', deletePortfolioItem);
router.patch('/:id/cover', setCoverImage);

export default router;
