/**
 * This example demonstrates setting up webhook
 * on the Heroku platform.
 */

require('dotenv/config');
const Telegraf = require('telegraf');
const TelegrafInlineMenu = require('telegraf-inline-menu');
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
    const chatID = msg.chat.id;
    const photo = 'https://grandorder.wiki/images/thumb/3/37/Fgo-mainpage-logo.png/300px-Fgo-mainpage-logo.png';
    
    if (msg.text.toLowerCase().indexOf(Hi) === 0) {
        bot.sendMessage(msg.chat.id,"Hello "+msg.from.first_name);
        bot.sendPhoto(chatID,photo, { caption: "People Die If They Being Killed"});
       
      }
        if (msg.text.toLowerCase().indexOf(Bye) === 0) {
          bot.sendMessage(msg.chat.id,"Bye "+ msg.from.first_name);
    }
});

