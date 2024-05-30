# 🌦️ Weatheria

Weatheria is a Discord bot designed to provide comprehensive weather updates. Built with Discord.js, Node.js, and the OpenWeather API, this project is now finalized and ready for deployment in your Discord server.

## 🚀 Features

- **Current Weather**: Fetches current weather information for any city.
- **Weather Forecast**: Provides 5-day weather forecasts for any city.
- **Multi-city Weather**: Fetches weather information for multiple cities at once.

## 🛠️ Technologies Used

- **Discord.js**: For creating and managing the Discord bot.
- **Node.js**: Server-side JavaScript runtime.
- **OpenWeather API**: For fetching real-time weather data.

## 📂 Project Structure

- `weather.js`: Handles fetching weather data from the OpenWeather API.
- `deploy-commands.js`: Manages bot commands deployment.
- `index.js`: Main bot file that initializes the bot and handles commands.

## 🚧 Current Status

Weatheria and its basic functionalities is done! and available for deployment in Discord servers. This project has been a significant step in the journey to becoming a proficient full-stack developer.

## 📋 Usage

### Commands

- `/weather <city_name>`: Fetches current weather for the specified city.
- `/forecast <city_name>`: Provides a 5-day weather forecast for the specified city.
- `/multiweather <city1, city2, ...>`: Fetches current weather for multiple cities.
- `/help`: Lists all available commands and their usage.

### Example

- /weather Kathmandu
- /forecast Kathmandu
- /multiweather Kathmandu, Pokhara, Lalitpur


## 🌐 Live Link

*Coming soon!*

## ⚙️ Setup

To set up Weatheria locally, follow these steps:

1. **Clone the Repository**
    Ensure you have access to the repository. If not, request access from the repository owner.

    ```bash
    git clone https://github.com/SlytherSavior/weatheria.git
    cd weatheria
    ```

2. **Install Dependencies**
    ```bash
    npm install
    ```

3. **Create a `.env` File**
    Create a `.env` file in the root directory and add your Discord bot token and OpenWeather API key:
    ```
    DISCORD_TOKEN=your_discord_token_here
    OPENWEATHER_API_KEY=your_openweather_api_key_here
    ```

4. **Deploy Commands**
    ```bash
    node deploy-commands.js
    ```

5. **Run the Bot**
    ```bash
    node index.js
    ```

6. **Invite the Bot to Your Server**
    Generate an invite link for your bot using the Discord Developer Portal and invite it to your server.

## 🐞 Known Issues

- No known issues at this time!

## 📫 Contact

For any questions or suggestions, feel free to reach out:

- **📧 Email**: shrijan5414@gmail.com
- **🔗 LinkedIn**: [linkedin.com/in/slyther](https://linkedin.com/in/slyther)
- **🐦 Twitter**: [twitter.com/SlytherShrijan](https://x.com/SlytherShrijan)
- **🌐 Website**: [shrijanpoudel.com.np](https://www.shrijanpoudel.com.np)

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
