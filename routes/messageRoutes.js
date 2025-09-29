const defaultController = require('../controllers/defaultController')

async function messageRoutes(message) {
    return defaultController(message)
}

module.exports = messageRoutes