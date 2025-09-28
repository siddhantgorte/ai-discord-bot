const OpenAI = require('openai')
require('dotenv').config()

const client = new OpenAI()

async function replyUsingAI(query) {
    const SYSTEM_PROMPT = `
    I have a Discord bot and You are an AI assistant who will understand the message provided to you and reply it.
    `
    const response = await client.chat.completions.create({
        model: 'gpt-4.1',
        messages: [
            {role: 'system', content: SYSTEM_PROMPT},
            {role: 'user', content: query}
        ]
    })

    return response.choices[0].message.content
    
}

module.exports = async function defaultController(message) {
    try {
        const messageReply = await replyUsingAI(message.content)
        await message.reply({ content: messageReply })
    }
    catch (error) {
        console.error('defaultController() reply failed', error)
    }
}