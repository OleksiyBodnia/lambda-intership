import axios from 'axios';
import dotenv from 'dotenv';
import TelegramBot from 'node-telegram-bot-api';
import express from 'express';
import NodeCache from 'node-cache';

dotenv.config();

const bot = new TelegramBot(process.env.BOT_TOKEN);

const app = express();
const port = process.env.PORT || 3000;
const webhookUrl = process.env.WEBHOOK_URL;

app.use(express.json());

bot.setWebHook(`${webhookUrl}/bot${process.env.BOT_TOKEN}`);

app.post(`/bot${process.env.BOT_TOKEN}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

const city = 'Київ';

bot.onText(/\/start/, msg => {
  const chatId = msg.chat.id;
  sendMainMenu(chatId);
});

function sendMainMenu(chatId) {
  const keyboard = {
    reply_markup: {
      keyboard: [['Курс валют', `Погода в ${city}`]],
      resize_keyboard: true,
      one_time_keyboard: false,
    },
  };
  bot.sendMessage(chatId, 'Вітаємо! Оберіть опцію:', keyboard);
}

bot.on('message', async msg => {
  const chatId = msg.chat.id;
  const messageText = msg.text;

  switch (messageText) {
    case 'Курс валют':
      sendCurrencyMenu(chatId);
      break;
    case `Погода в ${city}`:
      sendWeatherMenu(chatId);
      break;
    case 'USD':
    case 'EUR':
      try {
        const rates = await getExchangeRates(messageText);
        bot.sendMessage(chatId, rates, { parse_mode: 'Markdown' });
      } catch (error) {
        bot.sendMessage(
          chatId,
          'Вибачте, сталася помилка при отриманні курсу валют.'
        );
      }
      break;
    case 'З інтервалом 3 години':
    case 'З інтервалом 6 годин':
      const interval = messageText === 'З інтервалом 3 години' ? 3 : 6;
      try {
        const forecast = await getWeatherForecast(city, interval);
        bot.sendMessage(chatId, forecast, { parse_mode: 'Markdown' });
      } catch (error) {
        bot.sendMessage(
          chatId,
          'Вибачте, сталася помилка при отриманні прогнозу погоди.'
        );
      }
      break;
    case 'Повернутися назад':
      sendMainMenu(chatId);
      break;
  }
});

function sendCurrencyMenu(chatId) {
  const keyboard = {
    reply_markup: {
      keyboard: [['USD', 'EUR'], ['Повернутися назад']],
      resize_keyboard: true,
      one_time_keyboard: false,
    },
  };
  bot.sendMessage(chatId, 'Оберіть валюту:', keyboard);
}

function sendWeatherMenu(chatId) {
  const keyboard = {
    reply_markup: {
      keyboard: [
        ['З інтервалом 3 години', 'З інтервалом 6 годин'],
        ['Повернутися назад'],
      ],
      resize_keyboard: true,
      one_time_keyboard: false,
    },
  };
  bot.sendMessage(chatId, 'Оберіть інтервал прогнозу:', keyboard);
}

const cache = new NodeCache({ stdTTL: 60 });

async function getExchangeRates(currency) {
  const cacheKey = `exchangeRates_${currency}`;
  const cachedData = cache.get(cacheKey);

  if (cachedData) {
    return cachedData;
  }

  try {
    const [privatResponse, monoResponse] = await Promise.allSettled([
      axios.get(
        'https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11'
      ),
      axios.get('https://api.monobank.ua/bank/currency'),
    ]);

    let privatRate, monoRate;

    if (privatResponse.status === 'fulfilled') {
      privatRate = privatResponse.value.data.find(
        rate => rate.ccy === currency
      );
    }

    if (monoResponse.status === 'fulfilled') {
      monoRate = monoResponse.value.data.find(
        rate =>
          (currency === 'USD' &&
            rate.currencyCodeA === 840 &&
            rate.currencyCodeB === 980) ||
          (currency === 'EUR' &&
            rate.currencyCodeA === 978 &&
            rate.currencyCodeB === 980)
      );
    }

    let message = `Курс ${currency}:\n\n`;

    if (privatRate) {
      message += `ПриватБанк:\nКупівля: ${parseFloat(privatRate.buy).toFixed(
        2
      )}\nПродаж: ${parseFloat(privatRate.sale).toFixed(2)}\n\n`;
    } else {
      message += `ПриватБанк: Дані недоступні\n\n`;
    }

    if (monoRate) {
      message += `Монобанк:\nКупівля: ${monoRate.rateBuy.toFixed(
        2
      )}\nПродаж: ${monoRate.rateSell.toFixed(2)}`;
    } else {
      message += `Монобанк: Дані недоступні`;
    }

    cache.set(cacheKey, message);
    return message;
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    throw error;
  }
}

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
      const dayOfWeek = [
        'неділя',
        'понеділок',
        'вівторок',
        'середа',
        'четвер',
        'пʼятниця',
        'субота',
      ][date.getDay()];
      const formattedDate = `${dayOfWeek}, ${date.getDate()} ${
        [
          'січня',
          'лютого',
          'березня',
          'квітня',
          'травня',
          'червня',
          'липня',
          'серпня',
          'вересня',
          'жовтня',
          'листопада',
          'грудня',
        ][date.getMonth()]
      }`;

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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

console.log('Bot is running...');
