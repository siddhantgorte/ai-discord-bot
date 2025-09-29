const pingController = require('../controllers/pingController')
const createController = require('../controllers/createController')
const userController = require('../controllers/userController')
const serverController = require('../controllers/serverController')

async function slashCommandRoutes(interaction) {
    if (!interaction.isCommand()) return;
    
    if (interaction.commandName === 'ping') {
        return pingController(interaction)
    }

    if (interaction.commandName === 'create') {
        return createController(interaction)
    }

    if (interaction.commandName === 'user') {
        return userController(interaction)
    }

    if (interaction.commandName === 'server') {
        return serverController(interaction)
    }

}

module.exports = slashCommandRoutes