// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits, ActivityType } = require('discord.js');
require('dotenv').config(); // Load environmental variables from the .env file as well
const https = require("https");
const weatherApi = process.env.WEATHER_API_KEY; 

// // Create a new client instance
// const client = new Client({ intents: [GatewayIntentBits.Guilds] });
// const token = process.env.DISCORD_TOKEN;

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




// // Log in to Discord with your client's token
// client.login(token);


//here we will try out our current codes . ! 
// adding api from openweather , for getting weather  ! 

console.log(weatherApi); 




//fucntion for getting weather data
function setUrl(cityName) {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${weatherApi}`;
    return url;
}

