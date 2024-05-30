const { SlashCommandBuilder } = require('@discordjs/builders');
const https = require('https');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('historical')
        .setDescription('Displays historical weather data for a specified date and city.')
        .addStringOption(option =>
            option.setName('city')
                .setDescription('The city to get historical weather data for')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('date')
                .setDescription('The date to get historical weather data for (YYYY-MM-DD)')
                .setRequired(true)),
    async execute(interaction) {
        const city = interaction.options.getString('city');
        const date = interaction.options.getString('date');
        const apiKey = process.env.WEATHER_API_KEY;
        const unixTime = Math.floor(new Date(date).getTime() / 1000);
        const url = `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat={LATITUDE}&lon={LONGITUDE}&dt=${unixTime}&appid=${apiKey}`;

        // Get latitude and longitude for the city
        const locationUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
        https.get(locationUrl, locResponse => {
            let locData = '';
            locResponse.on('data', chunk => {
                locData += chunk;
            });
            locResponse.on('end', () => {
                const locationData = JSON.parse(locData);
                if (locResponse.statusCode === 200) {
                    const lat = locationData.coord.lat;
                    const lon = locationData.coord.lon;
                    const historicalUrl = `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${unixTime}&appid=${apiKey}`;

                    https.get(historicalUrl, histResponse => {
                        let histData = '';
                        histResponse.on('data', chunk => {
                            histData += chunk;
                        });
                        histResponse.on('end', () => {
                            const historicalData = JSON.parse(histData);
                            if (histResponse.statusCode === 200) {
                                const description = historicalData.current.weather[0].description;
                                const temp = historicalData.current.temp;
                                interaction.reply(`🌆 **Historical Weather in ${city} on ${date}**: ${description}, 🌡️ **Temperature**: ${temp}°C`);
                            } else {
                                interaction.reply(`Failed to get historical weather data for ${city} on ${date}`);
                            }
                        });
                    }).on('error', error => {
                        console.error(error);
                        interaction.reply('Error fetching historical weather data.');
                    });
                } else {
                    interaction.reply(`Failed to get location data for ${city}`);
                }
            });
        }).on('error', error => {
            console.error(error);
            interaction.reply('Error fetching location data.');
        });
    }
};
