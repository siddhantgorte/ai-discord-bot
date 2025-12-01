const fs = require('fs');
const path = require('path');
const { ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js')

async function returnUserFilesController(interaction) {
    const userId = interaction.user.id;
    const userFolder = path.join(__dirname, '..', 'uploads', userId)

    //  Check if user folder exists
    if (!fs.existsSync(userFolder)) {
        return interaction.reply({
            content: 'You have not uploaded any files yet.',
            ephemeral: true
        })
    }

    const userFiles = fs.readdirSync(userFolder).sort()

    if (userFiles.length === 0) {
        return interaction.reply({
            content: 'You have not uploaded any files yet.',
            ephemeral: true
        });
    }

    const selectMenu = new StringSelectMenuBuilder()
    .setCustomId('select_file')
    .setPlaceholder('Select a file')
    .addOptions(userFiles.map(fileName => ({
        label: fileName,
        value: fileName
    })))

    const row = new ActionRowBuilder().addComponents(selectMenu)

    await interaction.reply({
        content: 'Select a file from your uploads : ',
        components:[row],
        ephemeral: true
    })
}

module.exports = returnUserFilesController