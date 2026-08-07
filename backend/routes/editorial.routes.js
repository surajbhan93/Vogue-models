import { Router } from 'express';
import {
  getPublicEditorials,
  createEditorial,
  updateEditorial,
  deleteEditorial,
} from '../controllers/editorial.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

// 🔹 PUBLIC ROUTE (Fetch for Home Page / Editorials Section)
router.get('/', getPublicEditorials);

// 🔹 ADMIN ROUTES (Upload, Update, Delete)
router.post('/', authMiddleware, createEditorial);
router.put('/:id', authMiddleware, updateEditorial);
router.delete('/:id', authMiddleware, deleteEditorial);

export default router;