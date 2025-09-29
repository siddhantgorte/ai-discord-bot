# 🤖 AI-Powered Discord Bot with Smart Replies & URL Shortening  

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green?logo=node.js)](https://nodejs.org/)  
[![Discord.js](https://img.shields.io/badge/discord.js-v14-blue?logo=discord)](https://discord.js.org/)  
[![MongoDB](https://img.shields.io/badge/MongoDB-6.x-brightgreen?logo=mongodb)](https://www.mongodb.com/)  
[![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4.1-orange?logo=openai)](https://openai.com/)  
[![License](https://img.shields.io/badge/License-MIT-lightgrey)](LICENSE)  

This is an **AI-powered Discord bot** that can:  
- 💬 Reply to user messages using OpenAI  
- 🔗 Shorten URLs with a `/create` command  
- 🌐 Redirect short links via a built-in web server  
- 👤 Track the user who created the short URL  

👉 Repo: [siddhantgorte/ai-discord-bot](https://github.com/siddhantgorte/ai-discord-bot)  

---

## ⚙️ Setup  

### 1. Clone the repo  
```bash
git clone https://github.com/siddhantgorte/ai-discord-bot.git
cd ai-discord-bot
```

### 2. Install dependencies  
```bash
npm install
```

### 3. Environment variables  
Create a `.env` file in the root:  

```
DISCORD_TOKEN=your-discord-bot-token
CLIENT_ID=your-discord-client-id
MONGO_URI=mongodb://localhost:27017/discord-short-url
BASE_URL=http://localhost:8000
OPENAI_API_KEY=your-openai-api-key
```

---

## 🎮 How to get your Discord Bot Token & Client ID  

To run this bot, you’ll need a **Discord Server, Bot, Bot Token & Client ID**.  

📺 [Watch this YouTube video guide](https://youtu.be/5UOMuTWrh6Q?si=dcUVBZ9Vh_LofPnz)
Discord Official Documentation :- https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot

---

## 🚀 Run the Bot  

### Register slash commands  
```bash
node registerCommands.js
```

### Start the bot & server  
```bash
node index.js
```

---

## 🔮 More Updates to Come  

This is just the **first version**. Stay tuned for more updates as the bot evolves with new features and improvements! 🚀