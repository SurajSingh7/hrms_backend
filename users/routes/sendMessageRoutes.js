import express from 'express';
import { getAllMessages, sendMessage } from '../controllers/messageController.js';

const router = express.Router();

// Routes
router.get('/messages', getAllMessages);
router.post('/send-message', sendMessage);

export default router;
