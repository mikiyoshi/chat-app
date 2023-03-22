import express from 'express';
import axios from 'axios';

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    // from client/src/state/api.js postLogin
    // from client/src/components/chat/login/index.jsx handleLogin

    const chatEngineResponse = await axios.get(
      'https://api.chatengine.io/users/me',
      {
        headers: {
          'Project-ID': process.env.PROJECT_ID,
          'User-Name': username,
          'User-Secret': password,
        },
      }
    );

    res.status(200).json({ response: chatEngineResponse.data });
  } catch (error) {
    console.error('error', error);
    res.status(500).json({ error: error.message });
  }
});

router.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;
    // from client/src/state/api.js postSignUp
    // from client/src/components/chat/login/index.jsx handleRegister

    const chatEngineResponse = await axios.post(
      'https://api.chatengine.io/users/',
      {
        username: username,
        secret: password,
      },
      {
        headers: { 'Private-Key': process.env.PRIVATE_KEY }, // setting at .env
      }
    );

    res.status(200).json({ response: chatEngineResponse.data });
  } catch (error) {
    console.error('error', error.message);
    res.status(500).json({ error: error.message });
  }
});

export default router;
