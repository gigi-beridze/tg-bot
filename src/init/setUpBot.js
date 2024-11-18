"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setUpBot = void 0;
const helpers_1 = require("../helpers");
const botCommands_1 = require("../constants/botCommands");
const __1 = require("../..");
const setUpBot = (bot) => {
    setCommands(bot)
        .then(() => {
        setHandlers(bot);
        setCallbacks(bot);
    })
        .then(() => {
        bot.start();
        __1.logger.info("George's bot started.");
    });
};
exports.setUpBot = setUpBot;
const setCommands = (bot) => {
    return bot.api.setMyCommands(botCommands_1.BOT_COMMANDS)
        .then(() => __1.logger.info('Command list is set..'));
};
const setCallbacks = (bot) => {
    bot.on('callback_query', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        const callbackQuery = ctx.callbackQuery;
        if (!callbackQuery || !callbackQuery.message)
            return;
        const data = callbackQuery.data;
        if (data === 'low') {
            (0, helpers_1.setCurrentData)('low');
        }
        else if (data === 'high') {
            (0, helpers_1.setCurrentData)('high');
        }
        const { message, menu } = (0, helpers_1.buildStaticStockList)();
        if (callbackQuery.message.text !== message || !areKeyboardsEqual(callbackQuery.message.reply_markup, menu)) {
            yield ctx.editMessageText(message, { parse_mode: "HTML", reply_markup: menu });
        }
    }));
};
const areKeyboardsEqual = (keyboard1, keyboard2) => {
    return JSON.stringify(keyboard1) === JSON.stringify(keyboard2);
};
const setHandlers = (bot) => {
    bot.command("start", (ctx) => {
        const { message, menu } = (0, helpers_1.buildStaticStockList)();
        ctx.reply(message, { parse_mode: "HTML", reply_markup: menu });
    });
};
