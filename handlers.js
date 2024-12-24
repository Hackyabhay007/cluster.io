const { Markup } = require('telegraf');
const { WEB_APP_URL } = require('./config');
const fs = require('fs');

const startHandler = async (ctx) => {
  const chatId = ctx.message.chat.id;
  const username = ctx.message.chat.username;
  let referralId = ctx.message.text.split(' ')[1] || '';

  const welcomeMessage = `Hello ${username}! 👋`;
  const description = `Welcome to Cluster Protocol 🚀

The next generation of DeFi trading:
✨ Simple & Efficient Trading
🔄 Cross-chain Transactions
🛡️ Maximum Security`;

  const imagePath = 'img.png';

  await ctx.replyWithPhoto(
    { source: imagePath },
    {
      caption: `${welcomeMessage}\n\n${description}`,
      reply_markup: {
        inline_keyboard: [
          [{ text: '🚀 Launch App', web_app: { url: referralId ? `${WEB_APP_URL}/trade/${chatId}/${referralId}` : `${WEB_APP_URL}/trade/${chatId}` } }],
          [{ text: '💬 Join Community', url: 'https://t.me/clusterprotocol' }],
          [{ text: 'ℹ️ Info', callback_data: '/help' }]
        ]
      }
    }
  );
};

const helpHandler = async (ctx) => {
  await ctx.reply('Welcome to Cluster Protocol! Click Launch App to start trading.',
    Markup.inlineKeyboard([
      [{ text: '🚀 Launch App', callback_data: '/start' }]
    ])
  );
};

const webAppDataHandler = async (ctx) => {
  console.log('Web App Data:', ctx.webAppData);
};

module.exports = {
  startHandler,
  helpHandler,
  webAppDataHandler
};