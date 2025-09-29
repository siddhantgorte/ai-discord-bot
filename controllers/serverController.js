async function serverController(interaction) {
    try {
        const serverName = interaction.guild.name;
        const memberCount = interaction.guild.memberCount;

        return interaction.reply(`This is ${serverName} server and has ${memberCount} members`)
    }
    catch (error) {
        console.error('serverController() failed', error);
        return interaction.reply({
            content: '⚠️ Could not fetch server info!',
            ephemeral: true,
        })
    }
}

module.exports = serverController