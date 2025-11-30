const defaultController = require('../controllers/defaultController')
const fileUploadController = require('../controllers/fileUploadController')

async function messageRoutes(message) {
    if (message.attachments.size > 0) {     // Check if the message has attachments (files)
        return fileUploadController(message)
    }

    // Otherwise, forward to defaultController to give AI response
    return defaultController(message)
}

module.exports = messageRoutes