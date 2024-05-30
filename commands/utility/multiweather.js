const { SlashCommandBuilder } = require('@discordjs/builders');
const https = require('https');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('multiweather')
        .setDescription('Displays current weather information for multiple cities.')
        .addStringOption(option =>
            option.setName('cities')
                .setDescription('Comma-separated list of cities')
                .setRequired(true)),
    async execute(interaction) {
        const cities = interaction.options.getString('cities').split(',').map(city => city.trim());
        const apiKey = process.env.WEATHER_API_KEY;
        let weatherReports = '';

        cities.forEach((city, index) => {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
            
            https.get(url, response => {
                let data = '';
                response.on('data', chunk => {
                    data += chunk;
                });
                response.on('end', () => {
                    const weatherData = JSON.parse(data);
                    if (response.statusCode === 200) {
                        const description = weatherData.weather[0].description;
                        const temp = weatherData.main.temp;
                        weatherReports += `🌆 **Weather in ${city}**: ${description}, 🌡️ **Temperature**: ${temp}°C\n`;
                    } else {
                        weatherReports += `Failed to get weather data for ${city}\n`;
                    }
                    // Reply once all cities are processed
                    if (index === cities.length - 1) {
                        interaction.reply(weatherReports);
                    }
                });
            }).on('error', error => {
                console.error(error);
                weatherReports += `Error fetching weather data for ${city}\n`;
                if (index === cities.length - 1) {
                    interaction.reply(weatherReports);
                }
            });
        });
    }
};
