import { Router } from "express";
import {
  adminGetAllModels,
  adminGetModelById,
  adminUpdateModel,
  adminVerifyModel,
  adminChangeStatus,
  adminDeleteModel,
  adminGetStats,
} from "../controllers/admin/admin.model.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminOnly } from "../middlewares/adminOnly.js";

const router = Router();

// ============================================
// 🔹 ADMIN ROUTES (Authentication Required)
// ============================================

// All routes below require admin authentication
router.use(authMiddleware);
router.use(adminOnly);

// ============================================
// 🔹 DASHBOARD
// ============================================

// Dashboard Statistics
router.get("/stats", adminGetStats);

// ============================================
// 🔹 MODELS
// ============================================

// Get All Models
router.get("/", adminGetAllModels);

// Get Single Model
router.get("/:id", adminGetModelById);

// Update Model
router.put("/:id", adminUpdateModel);

// Verify Model
router.patch("/:id/verify", adminVerifyModel);

// Change Status
router.patch("/:id/status", adminChangeStatus);

// Delete Model
router.delete("/:id", adminDeleteModel);

export default router;