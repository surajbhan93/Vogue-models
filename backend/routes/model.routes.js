// // backend/routes/model.routes.js
// import { Router } from 'express';
// import {
//   registerModel,
//   loginModel,
//   getModelProfile,
//   updateModelProfile,
//   getAllModels,
//   // getModelById,
//    getModelBySlug,   // ✅ Add
//   logoutModel,
//   deleteModel,
//   changePassword,
// } from '../controllers/web/model.controller.js';
// import { authMiddleware } from '../middlewares/auth.middleware.js';

// const router = Router();

// // 🔹 PUBLIC ROUTES
// router.post('/register', registerModel);
// router.post('/login', loginModel);
// router.get('/', getAllModels);

// // 🔹 PROTECTED ROUTES (MUST BE DEFINED BEFORE DYNAMIC /:id ROUTE!)
// router.get('/profile/me', authMiddleware, getModelProfile);   // ✅ FIXED: Must be defined before /:id
// router.put('/profile/me', authMiddleware, updateModelProfile);
// router.put('/change-password', authMiddleware, changePassword);
// router.post('/logout', authMiddleware, logoutModel);
// router.delete('/me', authMiddleware, deleteModel);

// // 🔹 DYNAMIC ID ROUTE (MUST BE AT THE BOTTOM)
// // router.get('/:id', getModelById);                              // ✅ FIXED: Dynamic /:id placed at bottom
// router.get("/:slug", getModelBySlug);     // ✅ Slug route
// export default router;


import { Router } from 'express';
import {
  registerModel,
  loginModel,
  getModelProfile,
  updateModelProfile,
  getAllModels,
  getModelBySlug,
  logoutModel,
  deleteModel,
  changePassword,
} from '../controllers/web/model.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

// 🔹 PUBLIC ROUTES
router.post('/register', registerModel);
router.post('/login', loginModel);
router.get('/', getAllModels); // Usage: /api/models?category=Actor or ?category=Singer or ?category=Painter etc.

// 🔹 PROTECTED ROUTES (MUST BE DEFINED BEFORE DYNAMIC /:slug ROUTE)
router.get('/profile/me', authMiddleware, getModelProfile);
router.put('/profile/me', authMiddleware, updateModelProfile);
router.put('/change-password', authMiddleware, changePassword);
router.post('/logout', authMiddleware, logoutModel);
router.delete('/me', authMiddleware, deleteModel);

// 🔹 DYNAMIC SLUG / ID ROUTE (MUST BE AT THE BOTTOM)
router.get('/:slug', getModelBySlug);

export default router;