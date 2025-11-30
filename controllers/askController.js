const { selectedFiles } = require('./selectFileController')

async function askController(interaction) {
    const userId = interaction.user.id
    const question = interaction.options.getString?.('question') || interaction.options.get('question')?.value

    
    if (!question) {
        return interaction.reply({
            content: "❌ Please provide a question!\nExample: `/ask question: What is Node.js?`",
            ephemeral: true
        })
    }
    
    //  check if a file was selected
    const fileName = selectedFiles.get(userId)
    if (!fileName) {
        return interaction.reply({
            content: `You haven't selected a file yet! Use '/myfiles' and select a file`,
            ephemeral: true,
        })
    }

    await interaction.reply({
        content: `📌 Received your question:\n**${question}**\n\nSelected file: **${fileName}**\n\n⏳ Processing...`,
        ephemeral: true
    })

}

module.exports = askController