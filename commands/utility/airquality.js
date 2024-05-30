const { SlashCommandBuilder } = require('@discordjs/builders');
const https = require('https');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('airquality')
        .setDescription('Displays the air quality index for a specified city.')
        .addStringOption(option =>
            option.setName('city')
                .setDescription('The city to get the air quality index for')
                .setRequired(true)),
    async execute(interaction) {
        const city = interaction.options.getString('city');
        const apiKey = process.env.WEATHER_API_KEY;
        const url = `https://api.openweathermap.org/data/2.5/air_pollution?q=${city}&appid=${apiKey}`;

        https.get(url, response => {
            let data = '';
            response.on('data', chunk => {
                data += chunk;
            });
            response.on('end', () => {
                const airData = JSON.parse(data);
                if (response.statusCode === 200) {
                    const aqi = airData.list[0].main.aqi;
                    interaction.reply(`🌆 **Air Quality Index in ${city}**: ${aqi}`);
                } else {
                    interaction.reply(`Failed to get air quality data for ${city}`);
                }
            });
        }).on('error', error => {
            console.error(error);
            interaction.reply('Error fetching air quality data.');
        });
    }
};
