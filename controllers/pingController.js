async function pingController(interaction) {
    try {
        await interaction.reply({content: '🏓 Pong!', ephemeral: true});
    }
    catch (error) {
        console.error('pingController() failed', error);
        return interaction.reply({
            content: '⚠️ Something went wrong with ping!',
            ephemeral: true,
        });
    }
}

module.exports = pingController;