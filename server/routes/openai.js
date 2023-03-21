import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import { openai } from '../index.js';

dotenv.config();
const router = express.Router();

router.post('/text', async (req, res) => {
  // http://localhost:1337/openai/text
  try {
    const { text, activeChatId } = req.body;
    console.log('text: ', text);
    res.status(200).json({ text });
  } catch (error) {
    console.error('error', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
