// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits, ActivityType } = require('discord.js');
require('dotenv').config(); // Load environmental variables from the .env file as well
const https = require("https");

// // Create a new client instance
// const client = new Client({ intents: [GatewayIntentBits.Guilds] });
// const token = process.env.DISCORD_TOKEN;
const weatherApi = process.env.WEATHER_API_KEY; 

//fucntion for getting weather data
function setUrl(cityName) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${weatherApi}`;
    return url;
}


function getWeatherData(cityname, callback) { 
    const url = setUrl(cityname) ;

    https.get(url, (resp) => { 
        let data = ''; 

        // A chunk of data has been recieved 
        resp.on('data', (chunk) => { 
            data += chunk; 
        }); 


        //The whole response has been recieved 
        resp.on('end', () => { 
            if(resp.statusCode === 200 ) { 
                const weatherData = JSON.parse(data); 
                const temp = weatherData.main.temp; 
                const description = weatherData.weaather.description; 
                callback(null, weatherData) ; 
            }else { 
                callback(`Error ${resp.statusCode} - ${resp.statusMessage}`);
            }
        }).on('error', (err) => { 
            callback(err);
        })


    })

}

// // When the client is ready, run this code (only once).
// client.once(Events.ClientReady, readyClient => {
//     console.log(`Ready! Logged in as ${readyClient.user.tag}`);
    
//     // Set the bot status to Watching with happiness
//     client.user.setPresence({ 
//         activities: [{
//             name: 'with happiness',
//             type: ActivityType.Watching,
//             url: 'https://github.com/SlytherSavior/Test-Bot'
//         }],
//         status: 'dnd'
//     });
// });
