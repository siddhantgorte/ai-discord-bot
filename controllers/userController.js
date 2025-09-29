async function userController(interaction) {
    try {
        // interaction.user → basic user info
        // interaction.member → guild-specific info (like join date)
        const username = interaction.user.username
        const joinedAt = interaction.member.joinedAt.toDateString()

        return interaction.reply(`This command was run by ${username}, joined server on ${joinedAt}`)
    }
    catch (error) {
        console.error('userController() failed', error)
        return interaction.reply({
            content: '⚠️ Could not fetch user info!',
            ephemeral: true,
        })
    }
}

module.exports = userController;