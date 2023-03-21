# chat-app
Build a Chat App with ChatGPT

# client initialization
```
nvm install v16
```
```
npm create vite@latest
```
Ok to proceed? (y) y
✔ Project name: … client
✔ Select a framework: › React
✔ Select a variant: › JavaScript

```
cd client
```
```
npm i
```
```
npm i react-redux @reduxjs/toolkit @heroicons/react react-router-dom react-dropzone react-chat-engine-advanced
```
```
npm i -D sass
```
```
npm run dev
```
```
npm i -D eslint eslint-config-react-app
```
```
npm i -D @types/node
```


# VScode Extension
- ES7 React/Redux/GraphQL/React-Native snippets
  - rcfe // react base code
- Prettier ESLint
  - Prettier - Code formatter(does it ok???)

# Chat Engine

[Chat Engine](https://chatengine.io/)
- sign up
  - New Project
    - Project Title: chat-app
    - Promo Code: edward
      - create project
  - User
    - New User
      - Username: testuser
      - Secret: 1234
      - Confirm Secret: 1234
      - Avatar: bear.jpg // only JPG
        - Create Person
  - Chats
    - New Chat
      - Chat Title: test-chat
        - Create chat

## More Customize
[Chat Engine Custom CSS](https://chatengine.io/docs/react/v1/customize_ui/custom_css)

[Introduction](https://chatengine.io/docs/react/v2)
[Rest Chat Engine](https://rest.chatengine.io/)
[Storybook](https://storybook.js.org/docs/react/get-started/install/)


# heroicons.com
[heroicons.com](https://heroicons.com/)

# ChatGPT
[ChatGPT](https://openai.com/blog/chatgpt)


[OpenAI](https://platform.openai.com/docs/guides/chat/introduction)
- Sign up // Create Account
  - Login // Get in your phone number
  - MIKI(Optional)
    - View API Key // right corner my account pull down menu
      - Create new secret key
      - copy secret key // when didn't copy this key, you can't see it again, so delete it and create again // paste to 'OPEN_API_KEY' at server/.env

## create server
- create server folder in chat-app folder // same layer at client
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
```
mkdir server
```
```
cd server
```
```
npm init -y
```
- create .env file in server folder
```
PORT=1337 // 1337 from client/.env.local VITE_BASE_URL=http://localhost:1337
OPEN_API_KEY= // this is copy from OpenAI API key // secret key
```

## server initialization
- add 'dependencies'
```
npm i express body-parser cors dotenv helmet morgan
```
```
npm i axios
```
- add package.json
  ```
  "type": "module"
  ```
  and
  ```
  "dev": "nodemon index.js"
  ```

- add -D = 'devDependencies'
```
npm i -D nodemon
```
```
npm run dev
```

## OpenAI Node.js Library
[OpenAI Node.js Library](https://github.com/openai/openai-node)
```
npm install openai
```
- copy and paste at index.js 'OPEN AI CONFIGURATION'
```
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,  // OPENAI_API_KEY replace to OPEN_API_KEY
});
const openai = new OpenAIApi(configuration); // add export before const
```

