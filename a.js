const { Markup } = require('telegraf');
const { WEB_APP_URL } = require('./config');

const startHandler = async (ctx) => {
  const chatId = ctx.message.chat.id;
  const referralId = ctx.message.text.split('=')[1] || '';
  const username = ctx.message.chat.username;

  // Personalized welcome message
  const welcomeMessage = `${username} Welcome to HodlSwap!`;
  const description = `HodlSwap is like a treasure hunt for tokens! Users can earn them by using different mining app features. And guess what? The players get most of the tokens!

Let's gather your squad! More buddies mean more coins.

Let's make it rain!`;

  if (referralId) {
    // Referral ID is present
    await ctx.reply(`Welcome to Hodl Swap! You are referred by: ${referralId}`, Markup.inlineKeyboard([
      [Markup.button.webApp('Play', `${WEB_APP_URL}/home/${chatId}/${referralId}`)],
      [Markup.button.url('Join Community', 'https://t.me/hodlswap')]
    ]));
  } else {
    // Referral ID is not present
    await ctx.reply('Welcome to Hodl Swap!', Markup.inlineKeyboard([
      [Markup.button.webApp('Play', `${WEB_APP_URL}/home/${chatId}`)],
      [Markup.button.url('Join Community', 'https://t.me/hodlswap')]
      [Markup.button.callback('/help', 'Help')]
    ]));
  }

  // Send the welcome message with image, text, and buttons
  await ctx.replyWithPhoto(
    { source: 'https://i.imgur.com/DQRX2Th.png' },
    {
      caption: `${welcomeMessage}\n\n(Description)\n\n${description}`,
      reply_markup: Markup.inlineKeyboard([
        [Markup.button.webApp('Play', `${WEB_APP_URL}/home/${chatId}/${referralId}`)],
        [Markup.button.url('Join Community', 'https://t.me/hodlswap')],
        [Markup.button.callback('/help', 'Help')]
      ])
    }
  );
};

const helpHandler = async (ctx) => {
  await ctx.reply('To use this bot, please start by sending the /start command. This will take you to the HodlSwap platform where you can start earning tokens!', Markup.inlineKeyboard([
    [Markup.button.callback('/start', '/start')]
  ]));
};

const webAppDataHandler = async (ctx) => {
  // Handle data received from the web app
  console.log('Web App Data:', ctx.webAppData);
};

module.exports = {
  startHandler,
  helpHandler,
  webAppDataHandler
};
