const {REST, Routes} = require('discord.js')
require('dotenv').config()

const commands = [
    {
        name: 'ping',
        description: 'Replies with Pong!',
    },
    {
        name: 'create',
        description: 'Creates a new short URL',
        options: [
            {
                name: 'url',
                description: 'The URL to shorten',
                type: 3, // STRING
                required: true
            }
        ]
    },
    {
        name: 'user',
        description: 'Provides information about the user.',
    },
    {
        name: 'server',
        description: 'Provides information about the server.',
    }
]

const rest = new REST({version: '10'}).setToken(process.env.BOT_TOKEN);

(async () => {
    try{
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID), 
            {body: commands}
        )

        console.log('Successfully reloaded application (/) commands.');
        
    } catch (error) {
        console.error(error);
    }
})()