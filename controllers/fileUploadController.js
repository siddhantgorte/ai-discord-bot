const fs = require('fs')
const path = require('path')

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
    }

    //  Reply to user
    await message.reply('File uploaded successfully. Use /command to ask questions')
}

module.exports = fileUploadController