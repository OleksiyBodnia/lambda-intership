import TelegramBot from 'node-telegram-bot-api';
import axios from 'axios';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const CITY = 'Київ';

const mainMenu = {
  reply_markup: {
    keyboard: [['Прогноз погоди'], ['Курс валют']],
    resize_keyboard: true,
  },
};

const weatherMenu = {
  reply_markup: {
    keyboard: [
      ['З інтервалом 3 години', 'З інтервалом 6 годин'],
      ['Повернутися назад'],
    ],
    resize_keyboard: true,
  },
};

const currencyMenu = {
  reply_markup: {
    keyboard: [['Курс USD', 'Курс EUR'], ['Повернутися назад']],
    resize_keyboard: true,
  },
};

bot.onText(/\/start/, msg => {
  bot.sendMessage(msg.chat.id, 'Виберіть опцію:', mainMenu);
});

bot.on('message', async msg => {
  const chatId = msg.chat.id;

  switch (msg.text) {
    case 'Прогноз погоди':
      bot.sendMessage(chatId, 'Виберіть інтервал:', weatherMenu);
      break;
    case 'Курс валют':
      bot.sendMessage(chatId, 'Виберіть валюту:', currencyMenu);
      break;
    case 'З інтервалом 3 години':
      await sendWeatherForecast(chatId, 3);
      break;
    case 'З інтервалом 6 годин':
      await sendWeatherForecast(chatId, 6);
      break;
    case 'Курс USD':
      await sendExchangeRate(chatId, 'USD');
      break;
    case 'Курс EUR':
      await sendExchangeRate(chatId, 'EUR');
      break;
    case 'Повернутися назад':
      bot.sendMessage(chatId, 'Виберіть опцію:', mainMenu);
      break;
  }
});

async function sendWeatherForecast(chatId, interval) {
  try {
    const response = await axios.get(
      `http://api.openweathermap.org/data/2.5/forecast?q=${CITY}&appid=${WEATHER_API_KEY}&units=metric&lang=ua`
    );
    const forecast = response.data.list;

    let message = `Погода в ${CITY}:\n`;
    let currentDate = '';

    forecast.forEach((item, index) => {
      if (index % (interval / 3) === 0) {
        const date = new Date(item.dt * 1000);
        const formattedDate = date.toLocaleDateString('uk-UA', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
        });
        const formattedTime = date.toLocaleTimeString('uk-UA', {
          hour: '2-digit',
          minute: '2-digit',
        });

        if (formattedDate !== currentDate) {
          message += `\n${formattedDate}:\n`;
          currentDate = formattedDate;
        }

        const temp = Math.round(item.main.temp);
        const feelsLike = Math.round(item.main.feels_like);
        const description = item.weather[0].description;

        message += `${formattedTime}, ${temp} °С, відчувається як: ${feelsLike} °С, ${description}\n`;
      }
    });

    bot.sendMessage(chatId, message);
  } catch (error) {
    bot.sendMessage(chatId, 'Помилка при отриманні прогнозу погоди');
  }
}

async function sendExchangeRate(chatId, currency) {
  try {
    const [privatResponse, monoResponse] = await Promise.all([
      axios.get(
        'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5'
      ),
      axios.get('https://api.monobank.ua/bank/currency'),
    ]);

    const privatRate = privatResponse.data.find(item => item.ccy === currency);
    const monoRate = monoResponse.data.find(
      item =>
        item.currencyCodeA === (currency === 'USD' ? 840 : 978) &&
        item.currencyCodeB === 980
    );

    const message = `Курс ${currency}:
ПриватБанк:
Купівля: ${Number(privatRate.buy).toFixed(2)}
Продаж: ${Number(privatRate.sale).toFixed(2)}
Монобанк:
Купівля: ${monoRate.rateBuy.toFixed(2)}
Продаж: ${monoRate.rateSell.toFixed(2)}`;

    bot.sendMessage(chatId, message);
  } catch (error) {
    console.error('Помилка при отриманні курсу валют:', error);
    bot.sendMessage(chatId, 'Помилка при отриманні курсу валют');
  }
}

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Бот працює!');
});

app.listen(PORT, () => {
  console.log(`Сервер запущено на порту ${PORT}`);
});
