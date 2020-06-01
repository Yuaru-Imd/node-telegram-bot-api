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
  const menu = new TelegrafInlineMenu('Main Menu');
  menu.urlButton('EdJoPaTo.de', 'https://edjopato.de');
  let mainMenuToggle = false
  menu.toggle('toggle me', 'a', {
    setFunc: (_ctx, newState) => {
      mainMenuToggle = newState
    },
    isSetFunc: () => mainMenuToggle
  });
  menu.simpleButton('click me', 'c', {
    doFunc: async ctx => ctx.answerCbQuery('you clicked me!'),
    hide: () => mainMenuToggle
  });
  
  menu.simpleButton('click me harder', 'd', {
    doFunc: async ctx => ctx.answerCbQuery('you can do better!'),
    joinLastRow: true,
    hide: () => mainMenuToggle
  });
  
  let selectedKey = 'b'
  menu.select('s', ['A', 'B', 'C'], {
    setFunc: async (ctx, key) => {
      selectedKey = key
      await ctx.answerCbQuery(`you selected ${key}`)
    },
    isSetFunc: (_ctx, key) => key === selectedKey
  });
  
 
    
  if (msg.text.toLowerCase().indexOf(Hi) === 0) {
      bot.sendMessage(msg.chat.id,"Hello "+msg.from.first_name);
      bot.sendPhoto(chatID,photo, { caption: "People Die If They Being Killed"});
      
    }
      if (msg.text.toLowerCase().indexOf(Bye) === 0) {
        bot.sendMessage(msg.chat.id,"Bye "+ msg.from.first_name);
  }
});
