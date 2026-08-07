// backend/routes/contestParticipationRoutes.js
import express from 'express';
import {
  registerForContest,
  reviewRegistration,
  initiateParticipationPayment,
  confirmParticipationPayment,
  submitRoundEntry,
  evaluateRoundSubmission,
  getContestParticipants,
  getMyParticipationStatus,
evaluateAndPromoteParticipant,
} from '../controllers/contestParticipationController.js';

// 🔹 Use your application's authMiddleware & adminOnly
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { adminOnly } from '../middlewares/adminOnly.js';

const router = express.Router();

// ============================================
// 🔹 MODEL ACTIONS (Logged-in Models)
// ============================================

// Model registers for contest (FREE)
router.post('/:contestId/register', authMiddleware, registerForContest);

// Model checks own participation status
router.get('/:contestId/my-status', authMiddleware, getMyParticipationStatus);

// Model initiates participation fee payment
router.post('/:id/pay', authMiddleware, initiateParticipationPayment);

// Model submits photo/video entry for a round
router.post('/:id/submit-round', authMiddleware, submitRoundEntry);
router.patch('/:id/evaluate-submission', authMiddleware, adminOnly, evaluateRoundSubmission);
router.patch('/:id/evaluate', authMiddleware, adminOnly, evaluateAndPromoteParticipant);
// ============================================
// 🔹 PAYMENT WEBHOOK / CALLBACK
// ============================================
router.patch('/:id/confirm-payment', confirmParticipationPayment);

// ============================================
// 🔹 ADMIN ACTIONS (Admin Only)
// ============================================

// Admin approves/rejects model registration
router.patch('/:id/review', authMiddleware, adminOnly, reviewRegistration);

// Admin fetches all participants for a contest
router.get('/contest/:contestId', authMiddleware, adminOnly, getContestParticipants);

export default router;