import { Command } from 'commander';
import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';

dotenv.config();

const bot = new TelegramBot(process.env.BOT_TOKEN);
const chatId = process.env.CHAT_ID;

const program = new Command();

program
  .version('1.0.0')
  .description('Telegram Console Sender');

program
  .command('message <message>')
  .alias('m')
  .description('Send a message to Telegram bot')
  .action((message) => {
    bot.sendMessage(chatId, message)
      .then(() => {
        console.log('Message sent successfully');
        process.exit(0);
      })
      .catch((error) => {
        console.error('Failed to send message:', error);
        process.exit(1);
      });
  });

program
  .command('photo <path>')
  .alias('p')
  .description('Send a photo to Telegram bot')
  .action((path) => {
    bot.sendPhoto(chatId, path)
      .then(() => {
        console.log('Photo sent successfully');
        process.exit(0);
      })
      .catch((error) => {
        console.error('Failed to send photo:', error);
        process.exit(1);
      });
  });

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
