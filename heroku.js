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
  const photo = 'https://media.giphy.com/media/4rhsbU05IsJNK/giphy.gif';
  
   
    
  if (msg.text.toLowerCase().indexOf(Hi) === 0) {
      bot.sendVideo(chatID,photo, { caption: "Wake UP!"});
      bot.sendMessage(msg.chat.id,"Hello "+msg.from.first_name);    
      bot.sendMessage(msg.chat.id, 'Select An Option',{
        reply_markup: {
          inline_keyboard: [[
            {
              text: 'Video',
              url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
            },{
              text: 'Where am I?',
              callback_data: bot.sendMessage(msg.chat.id,"Hmmmmmmm")
            }
          ]]
        }
      });
      
    }
      if (msg.text.toLowerCase().indexOf(Bye) === 0) {
        bot.sendMessage(msg.chat.id,"Bye "+ msg.from.first_name);
  }
});
