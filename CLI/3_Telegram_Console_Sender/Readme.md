# 3. Telegram Console Sender

App functionality:

1. Send a message to the Telegram bot from the console using a command:
`node app message ‘Your message’`
2. After its execution, the CLI automatically terminates the process to allow for entering the next command.
3. Send a photo that you drag into the console (or manually input the correct path to the photo on your PC) using a command:
`node app photo /path/to/photo/picture.png`
4. Consider that it will be important for the user to understand how to use your CLI, so ensure that you provide command descriptions and display relevant recommendations through the --help option.

⚠️ Use [commanderjs](https://www.npmjs.com/package/commander) library and [node-telegram-bot-api](https://www.npmjs.com/package/node-telegram-bot-api)

---

Technically and visually, the result must correspond to the example:


Send message node index.js message "Your message"   .

Send photo node index.js photo <path to photo>   .

Help list   ->  node index.js .







