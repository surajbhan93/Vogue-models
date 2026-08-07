// backend/routes/message.routes.js
import { Router } from 'express';
import {
  getInbox,
  getConversationMessages,
  sendMessage,
  startConversation,
} from '../controllers/web/message.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

router.use(authMiddleware);

router.get('/', getInbox);
router.post('/', startConversation);
router.get('/:id', getConversationMessages);
router.post('/:id', sendMessage);

export default router;
