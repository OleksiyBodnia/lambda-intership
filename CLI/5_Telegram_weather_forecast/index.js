import axios from "axios";
import dotenv from "dotenv";
import TelegramBot from 'node-telegram-bot-api';

dotenv.config();

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

const city = 'Київ'; 

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const keyboard = {
    reply_markup: {
      keyboard: [
        [`Прогноз погоди в ${city}`],
      ],
      resize_keyboard: true,
      one_time_keyboard: false
    }
  };

  bot.sendMessage(chatId, 'Вітаємо в Weather Forecast Bot!', keyboard);
});

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const messageText = msg.text;

  if (messageText === `Прогноз погоди в ${city}`) {
    bot.sendMessage(chatId, 'Будь ласка, оберіть інтервал:', {
      reply_markup: {
        keyboard: [
          ['З інтервалом 3 години', 'З інтервалом 6 годин']
        ],
        resize_keyboard: true,
        one_time_keyboard: false
      }
    });
  } else if (messageText === 'З інтервалом 3 години' || messageText === 'З інтервалом 6 годин') {
    const interval = messageText === 'З інтервалом 3 години' ? 3 : 6;
    try {
      const forecast = await getWeatherForecast(city, interval);
      bot.sendMessage(chatId, forecast, { parse_mode: 'Markdown' });
    } catch (error) {
      bot.sendMessage(chatId, 'Sorry, there was an error fetching the weather forecast.');
    }
  }
});

async function getWeatherForecast(city, interval) {
    const apiKey = process.env.WEATHER_API_KEY;
    const url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=ua`;
  
    try {
      const response = await axios.get(url);
      const forecasts = response.data.list;
  
      let message = `Погода в ${city}:\n\n`;
      let currentDate = '';
  
      for (let i = 0; i < forecasts.length; i += interval / 3) {
        const forecast = forecasts[i];
        const date = new Date(forecast.dt * 1000);
        const dayOfWeek = ['неділя', 'понеділок', 'вівторок', 'середа', 'четвер', 'пʼятниця', 'субота'][date.getDay()];
        const formattedDate = `${dayOfWeek}, ${date.getDate()} ${['січня', 'лютого', 'березня', 'квітня', 'травня', 'червня', 'липня', 'серпня', 'вересня', 'жовтня', 'листопада', 'грудня'][date.getMonth()]}`;
  
        if (formattedDate !== currentDate) {
          currentDate = formattedDate;
          message += `\n${formattedDate}:\n`;
        }
  
        const time = date.toTimeString().slice(0, 5);
        const temperature = Math.round(forecast.main.temp);
        const feelsLike = Math.round(forecast.main.feels_like);
        const description = forecast.weather[0].description;
  
        message += `${time}, ${temperature} °С, відчувається як: ${feelsLike} °С, ${description}\n`;
      }
  
      return message;
    } catch (error) {
      console.error('Error fetching weather data:', error);
      throw error;
    }
  }

console.log('Bot is running...');