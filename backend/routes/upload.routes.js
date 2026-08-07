// backend/routes/upload.routes.js
import { Router } from 'express';
import { uploadImage } from '../controllers/upload.controller.js';
import { upload } from '../middlewares/upload.middleware.js';

const router = Router();

// ✅ FIX: 'upload.any()' kisi bhi field name ('image', 'file', 'avatar') ko allow kar deta hai!
router.post('/', upload.any(), uploadImage);

export default router;