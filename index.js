const { Client,GatewayIntentBits } = require('discord.js')
const { connectToMongoDB } = require('./config/connect')
const express = require('express')
const commandRoutes = require('./routes/commands')
const slashCommandRoutes = require('./routes/slashCommands')
const webRoutes = require('./routes/webRoutes')

require('dotenv').config()
const PORT = process.env.PORT || 3000;

connectToMongoDB( 'mongodb://localhost:27017/discord-short-url' ).then( () => console.log( 'MongoDB Connected' ))

const app = express()

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
})

//  send all message to routes/commands.js
client.on('messageCreate', async (message) => {
    if (message.author.bot) return
    await commandRoutes(message)
})

// Send all slash commands to routes/slashCommands.js
client.on('interactionCreate', async (interaction) => {
  await slashCommandRoutes(interaction);
});

client.login(process.env.BOT_TOKEN)

app.use('/', webRoutes)
app.listen(PORT, () => console.log(`Server running, try URL's on http://localhost:${PORT} `))