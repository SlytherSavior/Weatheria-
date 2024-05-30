const { SlashCommandBuilder } = require('@discordjs/builders');
const https = require('https');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('forecast')
        .setDescription('Displays a 5-day weather forecast for a specified city.')
        .addStringOption(option =>
            option.setName('city')
                .setDescription('The city to get the weather forecast for')
                .setRequired(true)),
    async execute(interaction) {
        const city = interaction.options.getString('city');
        const apiKey = process.env.WEATHER_API_KEY;
        const latLongUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

        // Fetch the coordinates for the city
        https.get(latLongUrl, response => {
            let data = '';
            response.on('data', chunk => {
                data += chunk;
            });

            response.on('end', () => {
                try {
                    const weatherData = JSON.parse(data);
                    if (response.statusCode === 200) {
                        const { lat, lon } = weatherData.coord;
                        fetchForecast(interaction, city, apiKey, lat, lon);
                    } else {
                        interaction.reply(`Failed to get the coordinates of ${city}, please check if you've given the correct city name!`);
                    }
                } catch (error) {
                    console.error(error);
                    interaction.reply('Error parsing weather data.');
                }
            });
        }).on('error', error => {
            console.error(error);
            interaction.reply('Error fetching weather data, please try again later.');
        });
    }
};

async function fetchForecast(interaction, city, apiKey, lat, lon) {
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    https.get(forecastUrl, response => {
        let data = '';
        response.on('data', chunk => {
            data += chunk;
        });

        response.on('end', () => {
            try {
                const forecastData = JSON.parse(data);
                if (response.statusCode === 200) {
                    formatAndReplyForecast(interaction, city, forecastData);
                } else {
                    interaction.reply(`Failed to get weather forecast for ${city}`);
                }
            } catch (error) {
                console.error(error);
                interaction.reply('Error parsing forecast data.');
            }
        });
    }).on('error', error => {
        console.error(error);
        interaction.reply('Error fetching weather forecast.');
    });
}

function formatAndReplyForecast(interaction, city, forecastData) {
    let forecastMsg = "```";
    forecastMsg += `5-Day Weather Forecast for ${city}:\n\n`;

    for (let i = 0; i <= 4; i++) {
        const forecast = forecastData.list[i];
        const date = new Date(forecast.dt * 1000);
        forecastMsg += `${date.toDateString()} ${date.toTimeString().split(' ')[0]}\n`;
        forecastMsg += `Temperature: ${forecast.main.temp}°C (Feels like: ${forecast.main.feels_like}°C)\n`;
        forecastMsg += `Weather: ${forecast.weather[0].description}\n`;
        forecastMsg += `Humidity: ${forecast.main.humidity}%\n`;
        forecastMsg += `Wind Speed: ${forecast.wind.speed} m/s\n\n`;
    }
    forecastMsg += "```";
    interaction.reply(forecastMsg);
}
