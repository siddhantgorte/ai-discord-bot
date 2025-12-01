const fs = require('fs')
const path = require('path')
const indexPDF = require('../services/pdfIndexer')

async function fileUploadController(message) {
    const userId = message.author.id
    const userFolder = path.join(__dirname, '..', 'uploads', userId)

    //  Create folder for user if it doesn't exist
    if (!fs.existsSync(userFolder)) {
        fs.mkdirSync(userFolder, { recursive: true })
    }

    for (const attachment of message.attachments.values()) {
        const fileName = attachment.name
        const filePath = path.join(userFolder, fileName)

        //  Download the file
        const response = await fetch(attachment.url)
        const buffer = Buffer.from(await response.arrayBuffer())
        fs.writeFileSync(filePath, buffer)

        console.log(`Saved file ${fileName} for user ${userId}`);

        //  create seperate vector collection per user
        const collectionName = `user_${userId}`

        //  Index PDF into Qdrant
        await indexPDF(filePath, userId, collectionName)
    }

    //  Reply to user
    await message.reply('File uploaded successfully. Use /command to ask questions')
}

module.exports = fileUploadController