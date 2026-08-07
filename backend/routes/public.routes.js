import express from "express";
import {
  getModelBySlug,
  getAllModels,
} from "../controllers/web/model.controller.js";

import {
  getPublicPortfolioBySlug,
  getPublicModelPortfolio,
} from "../controllers/web/portfolio.controller.js";

const router = express.Router();

// Public Models
router.get("/models", getAllModels);
router.get("/models/:modelSlug/portfolio", getPublicModelPortfolio);
router.get("/models/:slug", getModelBySlug);

// Public Portfolio
router.get("/portfolio/:slug", getPublicPortfolioBySlug);

export default router;