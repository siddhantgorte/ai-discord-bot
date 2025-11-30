const selectedFiles = new Map()

function selectFileController(interaction) {
    const userId = interaction.user.id
    const selectedFile = interaction.values[0]   //  filename

    selectedFiles.set(userId, selectedFile)

    return interaction.reply({
        content: `You selected **${selectedFile}**\nAsk your question using /ask command!`,
        ephemeral: true
    })
}

module.exports = { selectFileController, selectedFiles}