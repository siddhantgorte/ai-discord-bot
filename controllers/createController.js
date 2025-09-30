const { createShortURL } = require('./url')

async function createController(interaction) {
    const url = interaction.options.getString('url')
    const username = interaction.user.username

    if (!url) {
        return interaction.reply({
            content : '❌ Please provide a valid URL.',
            ephemeral: true,
        })
    }

    try {
        // createShortURL should return an object with { shortURL, shortId }
        const shortURL = await createShortURL(url,username)

        return interaction.reply({ content: `✅ ShortURL : ${shortURL}`, ephemeral: true })
    }
    catch (error) {
        console.error(error)
        return interaction.reply({
            content: '⚠️ Failed to create short URL.\nPlease try again.',
            ephemeral: true,
        })
    }
}

module.exports = createController