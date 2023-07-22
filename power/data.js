const TelegramBot = require("node-telegram-bot-api");
const fs = require("fs");

const token = "YOUR_TELEGRAM_BOT_TOKEN";
const bot = new TelegramBot(token, { polling: true });

let data = [];

bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const messageText = msg.text;

  const consumptionRegex = /(\d+\.\d+)\[?(\d{4}-\d{2}-\d{2})?\]?/;
  const match = messageText.match(consumptionRegex);

  if (match) {
    const consumption = parseFloat(match[1]);
    const date = match[2] || new Date().toISOString().slice(0, 10);
    data.push({ x: date, y: consumption });
    bot.sendMessage(chatId, `Данные сохранены: ${consumption} на ${date}`);
  }
});

process.on("SIGINT", function () {
  fs.writeFileSync("data.json", JSON.stringify(data));
  process.exit();
});
