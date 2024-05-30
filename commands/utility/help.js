const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Displays information about available commands.'),

    async execute(interaction) {
        const commands = interaction.client.commands;

        // Format the list of commands
        const commandList = commands.map(command => `/${command.data.name}: ${command.data.description}`).join('\n');

        // Send the list of commands as a reply
        interaction.reply(`**Available Commands:**\n${commandList}`);
    },
};
