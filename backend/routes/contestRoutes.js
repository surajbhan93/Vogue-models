// backend/routes/contestRoutes.js

import express from "express";
import {
  createContest,
  updateContest,
  publishContest,
  advanceContestStage,
  cancelContest,
  deleteContest,
  getAllContestsAdmin,
  getPublicContests,
  getContestBySlug,
  getModelContestDashboard,
  selectTopParticipantsForRound,
  declareContestResults,
} from "../controllers/contestController.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminOnly } from "../middlewares/adminOnly.js";

const router = express.Router();

// ========================================
// Public Routes
// ========================================

router.get("/public", getPublicContests);
router.get("/public/:slug", getContestBySlug);

// ========================================
// Model Routes (Logged In Model)
// ========================================

router.get(
  "/my-dashboard",
  authMiddleware,
  getModelContestDashboard
);

// ========================================
// Admin Routes
// ========================================

router.get(
  "/admin/all",
  authMiddleware,
  adminOnly,
  getAllContestsAdmin
);

router.post(
  "/",
  authMiddleware,
  adminOnly,
  createContest
);

router.put(
  "/:id",
  authMiddleware,
  adminOnly,
  updateContest
);

router.patch(
  "/:id/publish",
  authMiddleware,
  adminOnly,
  publishContest
);

router.patch(
  "/:id/advance-stage",
  authMiddleware,
  adminOnly,
  advanceContestStage
);

router.patch(
  "/:id/cancel",
  authMiddleware,
  adminOnly,
  cancelContest
);

router.patch(
  "/:id/select-round/:roundNumber",
  authMiddleware,
  adminOnly,
  selectTopParticipantsForRound
);

router.patch(
  "/:id/declare-results",
  authMiddleware,
  adminOnly,
  declareContestResults
);

router.delete(
  "/:id",
  authMiddleware,
  adminOnly,
  deleteContest
);

export default router;