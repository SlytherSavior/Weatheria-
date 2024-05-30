const { SlashCommandBuilder } = require('@discordjs/builders');
const https = require('https');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('forecast')
        .setDescription('Displays a 3-day weather forecast for a specified city.')
        .addStringOption(option =>
            option.setName('city')
                .setDescription('The city to get the weather forecast for')
                .setRequired(true)),
    async execute(interaction) {
        const city = interaction.options.getString('city');
        const apiKey = process.env.WEATHER_API_KEY;
        const url = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&cnt=3&units=metric&appid=${apiKey}`;

        https.get(url, response => {
            let data = '';
            response.on('data', chunk => {
                data += chunk;
            });
            response.on('end', () => {
                const forecastData = JSON.parse(data);
                if (response.statusCode === 200) {
                    let forecastMsg = `🌆 **3-Day Weather Forecast for ${city}**:\n\n`;
                    forecastData.list.forEach(day => {
                        const date = new Date(day.dt * 1000).toLocaleDateString();
                        const description = day.weather[0].description;
                        const tempDay = day.temp.day;
                        const tempNight = day.temp.night;
                        forecastMsg += `📅 **Date**: ${date}\n${description}, 🌡️ **Day Temp**: ${tempDay}°C, 🌙 **Night Temp**: ${tempNight}°C\n\n`;
                    });
                    interaction.reply(forecastMsg);
                } else {
                    interaction.reply(`Failed to get weather forecast for ${city}`);
                }
            });
        }).on('error', error => {
            console.error(error);
            interaction.reply('Error fetching weather forecast.');
        });
    }
};
