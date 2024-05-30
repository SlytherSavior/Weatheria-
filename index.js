const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits, Events, ActivityType } = require('discord.js');
require('dotenv').config(); // Load environmental variables from the .env file

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Create a collection to store commands
client.commands = new Collection();

// Path to the commands directory
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

// Load all command files from the commands directory
for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);

		// Ensure the command has the required properties before adding it to the collection
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

// When the client is ready, run this code (only once)
client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

    // Set the bot's activity status
    client.user.setPresence({
        activities: [{
            name: 'to /help',
            type: ActivityType.Listening, 
            url: 'https://github.com/SlytherSavior/Test-Bot'
        }],
    });
});

// Handle command interactions
client.on(Events.InteractionCreate, async interaction => {
    // Check if the interaction is a command
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    // If the command doesn't exist, log an error and return
    if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
    }

    // Try to execute the command
    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);

        // Respond with an error message if command execution fails
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
        } else {
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    }
});

// Log in to Discord with your client's token
client.login(process.env.DISCORD_TOKEN);
