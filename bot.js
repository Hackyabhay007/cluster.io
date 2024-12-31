const config = require('./config.js');
const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(config.BOT_TOKEN, {polling: true});

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const username = msg.from.first_name;
    
    const welcomeMessage = `Hello ${username}! 👋`;
    const description = `Welcome to Cluster Protocol 🚀

The next generation of DeFi trading:

✨ Simple & Efficient Trading
🔄 Cross-chain Transactions
🛡️ Maximum Security`;

    const keyboard = {
        inline_keyboard: [
            [{
                text: '▶️ Launch ClusterProto',
                web_app: {
                    url: config.WEB_APP_URL
                }
            }]
        ]
    };

    // Send photo with combined welcome message and description
    bot.sendPhoto(chatId, 
        './img.png',  // Local image path
        {
            caption: `${welcomeMessage}\n\n${description}`,
            parse_mode: 'HTML',
            reply_markup: keyboard
        }
    );
});

bot.on('polling_error', (error) => {
    console.log(error);
});

console.log('Bot is running...');
