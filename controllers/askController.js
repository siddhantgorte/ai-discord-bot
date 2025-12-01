const { selectedFiles } = require('./selectFileController')
const queryPDF = require("../services/pdfQuery");

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

    // Defer reply while processing
    await interaction.deferReply({ ephemeral: true });

    //  call the PDF query module
    const answer = await queryPDF(userId, fileName, question)

    await interaction.followUp({
        content: answer,
        ephemeral: true,
    })
}

module.exports = askController