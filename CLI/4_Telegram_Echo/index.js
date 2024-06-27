import axios from 'axios';
import dotenv from 'dotenv';
import TelegramBot from 'node-telegram-bot-api';

dotenv.config();

const bot = new TelegramBot(process.env.BOT_TOKEN, {polling: true})
const chat_id = process.env.CHAT_ID;

bot.on('message', async (msg) => {
    const {chat: {id: chat_id}, text: messageText, from} = msg;
    const username = from.username || from.first_name || 'Невідомий користувач';

    console.log(`Користувач ${username} написав: ${messageText}`);

    if (messageText.toLowerCase() === "photo"){
        try{
            const imageUrl = 'https://picsum.photos/200/300';
            const {data} = await axios.get(imageUrl, {responseType: 'arraybuffer'});

            await bot.sendPhoto(chat_id, data, {
                filename: 'random_image.jpg',
                contentType: 'image/jpeg'
              });
        }
        catch(error){
            console.log("Помилка під час надсилання фото: ", error);
            bot.sendMessage(chat_id, messageText);
        }
    }
});

console.log("Telegram bot successfully started!");
