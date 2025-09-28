const defaultController = require('../controllers/defaultController')

async function commandRoutes(message) {
    return defaultController(message)
}

module.exports = commandRoutes