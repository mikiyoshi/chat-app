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
    // console.log('text: ', text);
    // res.status(200).json({ text });
    // console.log('req.body: ', req.body);
    // result at server 'npm run dev' terminal
    // req.body:  {
    //   attachments: [],
    //   created: '2023-03-22 16:09:35.016845+00:00',
    //   sender_username: 'testuser',
    //   text: 'Hey How is everything?',
    //   activeChatId: 152992
    // }

    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      // OpenAI Playground https://platform.openai.com/playground
      prompt: text,
      temperature: 0.5,
      max_tokens: 2048,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    });
    // console.log('response.data: ', response.data.choices[0].text);
    // result at server 'npm run dev' terminal
    // response.data: Everything is going great, thanks for asking!

    await axios.post(
      `https://api.chatengine.io/chats/${activeChatId}/messages/`,
      { text: response.data.choices[0].text },
      {
        headers: {
          'Project-ID': process.env.PROJECT_ID,
          'User-Name': process.env.BOT_USER_NAME,
          'User-Secret': process.env.BOT_USER_SECRET,
        },
      }
    );

    res.status(200).json({ text: response.data.choices[0].text });
  } catch (error) {
    console.error('error', error);
    res.status(500).json({ error: error.message });
  }
});

router.post('/code', async (req, res) => {
  try {
    const { text, activeChatId } = req.body;
    console.log('AiCode text: ', text); // for debugging
    // result at server 'npm run dev' terminal
    // AiCode text:  function makeSnakeCase // 質問の内容　function makeSnakeCase

    const response = await openai.createCompletion({
      model: 'code-davinci-002',
      prompt: text,
      temperature: 0.5,
      max_tokens: 2048,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    });
    console.log('AiCode response: ', response.data.choices[0].text); // for debugging
    // result at server 'npm run dev' terminal
    // AiCode response:   (str) {
    //   return str.replace(/[A-Z]/g, function (m) {
    //     return '_' + m.toLowerCase()
    //   })
    // }

    await axios.post(
      `https://api.chatengine.io/chats/${activeChatId}/messages/`,
      { text: response.data.choices[0].text },
      {
        headers: {
          'Project-ID': process.env.PROJECT_ID,
          'User-Name': process.env.BOT_USER_NAME,
          'User-Secret': process.env.BOT_USER_SECRET,
        },
      }
    );
    console.log('AiCode finish request'); // for debugging

    res.status(200).json({ text: response.data.choices[0].text });
  } catch (error) {
    // console.error('error', error);
    // result at server 'npm run dev' terminal
    // data: {error: [Object]} // これだとエラーの詳細がわからない
    console.error('error', error.response.data.error);
    // result at server 'npm run dev' terminal
    // error {
    //   message: 'That model does not exist', // これでエラーの原因が分かる // UPDATE model: 'code-davinci-003' to model: 'code-davinci-002'
    //   type: ...
    // }
    res.status(500).json({ error: error.message });
  }
});

export default router;
