import { Bot, Context } from "grammy";
import { buildStaticStockList, setCurrentData } from "../helpers";
import { BOT_COMMANDS } from "../constants/botCommands";
import { logger } from "../..";

export const setUpBot = (bot: Bot) => {
    setCommands(bot)
        .then(() => {
            setHandlers(bot);
            setCallbacks(bot); 
        })
        .then(() => {
            bot.start();
            logger.info("George's bot started.");
        });
}

const setCommands = (bot: Bot) => {
    return bot.api.setMyCommands(BOT_COMMANDS)
        .then(() => logger.info('Command list is set..'));
}

const setCallbacks = (bot: Bot) => {
    bot.on('callback_query', async (ctx: Context) => {
        const callbackQuery = ctx.callbackQuery;
        if (!callbackQuery || !callbackQuery.message) return;

        const data = callbackQuery.data;

        if (data === 'low') {
            setCurrentData('low'); 
        } else if (data === 'high') {
            setCurrentData('high'); 
        }

        const { message, menu } = buildStaticStockList();
        if (callbackQuery.message.text !== message || !areKeyboardsEqual(callbackQuery.message.reply_markup, menu)) {
            await ctx.editMessageText(message, { parse_mode: "HTML", reply_markup: menu });
        }
    });
};

const areKeyboardsEqual = (keyboard1: any, keyboard2: any): boolean => {
    return JSON.stringify(keyboard1) === JSON.stringify(keyboard2);
};

const setHandlers = (bot: Bot) => {
    bot.command("start", (ctx) => {
        const { message, menu } = buildStaticStockList();
        ctx.reply(message, { parse_mode: "HTML", reply_markup: menu });
    });
};
