const createController = require('../controllers/createController')

async function slashCommandRoutes(interaction) {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === 'create') {
        await createController(interaction)
    }
}

module.exports = slashCommandRoutes