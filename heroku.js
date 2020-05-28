/**
 * This example demonstrates setting up webhook
 * on the Heroku platform.
 */

require('dotenv/config');
const TOKEN = process.env.TELEGRAM_TOKEN || 'YOUR_TELEGRAM_BOT_TOKEN';
const TelegramBot = require('node-telegram-bot-api');
const options = {
  webHook: {
    port: process.env.PORT
  }
};

const url = process.env.APP_URL || 'https://<app-name>.herokuapp.com:443';
const bot = new TelegramBot(TOKEN, options);


// This informs the Telegram servers of the new webhook.
// Note: we do not need to pass in the cert, as it already provided
bot.setWebHook(`${url}/bot${TOKEN}`);


// Just to ping!
bot.on('message', (msg) => {
    var Hi = "hi";
    var Bye = "bye";
    if (msg.text.toLowerCase().indexOf(Hi) === 0) {
        bot.sendMessage(msg.chat.id,"Hello User");
      }
        if (msg.text.toLowerCase().indexOf(Bye) === 0) {
          bot.sendMessage(msg.chat.id,"Bye User");
    }
});