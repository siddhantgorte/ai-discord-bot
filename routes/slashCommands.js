const pingController = require('../controllers/pingController')
const createController = require('../controllers/createController')
const userController = require('../controllers/userController')
const serverController = require('../controllers/serverController')

const commands = {
    ping:   { controller: pingController, cooldown: 5 },
    create: { controller: createController, cooldown: 10 },
    user:   { controller: userController, cooldown: 5 },
    server: { controller: serverController, cooldown: 5 },
};

async function slashCommandRoutes(interaction) {
    if (!interaction.isCommand()) return;
    const command = commands[interaction.commandName];

    if (!command) return; // if command not found, just ignore

    return command.controller(interaction);

}

module.exports = slashCommandRoutes