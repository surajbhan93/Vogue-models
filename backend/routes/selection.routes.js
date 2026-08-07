import { Router } from "express";

import {
  getMySelection,
   adminGetSelections,
  adminGetSelectionById,
  adminUpdateRound,
} from "../controllers/web/selection.controller.js";


import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

// =========================
// Model Routes
// =========================

// Get My Selection Status
router.get("/", authMiddleware, getMySelection);

// =========================
// Admin Routes
// =========================

// Get All Selections
router.get("/admin", authMiddleware, adminGetSelections);

// Get Single Selection
router.get("/admin/:id", authMiddleware, adminGetSelectionById);

// Update Round
router.patch("/admin/:id", authMiddleware, adminUpdateRound);

export default router;