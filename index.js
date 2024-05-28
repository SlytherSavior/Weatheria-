const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits, Events, ActivityType } = require('discord.js');
require('dotenv').config(); // Load environmental variables from the .env file as well
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Commands collection
client.commands = new Collection();

// Path to commands directory
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath);

// Loading commands
for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
   // Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
    }


client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);


    //set the user activity 

    client.user.setPresence({
        activities: [{
            name: 'with happiness',
            type: ActivityType.Competing, 
            url: 'https://github.com/SlytherSavior/Test-Bot'
        }],
    })
});



// Handle command interactions
client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;
    console.log(interaction);

    	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});


client.login(process.env.DISCORD_TOKEN);