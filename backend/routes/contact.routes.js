// backend/routes/contact.routes.js
import { Router } from 'express';
import {
  submitContact,
  getAllContacts,
  getContactById,
  replyContact,
  updateContactStatus,
  deleteContact,
  getContactStats,
} from '../controllers/contact.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { adminOnly } from '../middlewares/adminOnly.js';

const router = Router();

// ============================================
// 🔹 PUBLIC ROUTES (No auth required)
// ============================================

// Submit contact form
router.post('/submit', submitContact);

// ============================================
// 🔹 ADMIN ROUTES (Auth required)
// ============================================

// All admin routes require authentication
router.use(authMiddleware);
router.use(adminOnly);

// Get all contacts
router.get('/', getAllContacts);

// Get contact stats
router.get('/stats', getContactStats);

// Get single contact
router.get('/:id', getContactById);

// Reply to contact
router.post('/:id/reply', replyContact);

// Update contact status
router.patch('/:id/status', updateContactStatus);

// Delete contact
router.delete('/:id', deleteContact);

export default router;