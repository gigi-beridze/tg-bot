"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setCurrentData = exports.buildStaticStockList = void 0;
const grammy_1 = require("grammy");
const highDataJson_1 = require("../data/highDataJson");
const lowDataJson_1 = require("../data/lowDataJson");
const messages_1 = require("../constants/messages");
let currentData = highDataJson_1.highDataJson;
const buildStaticStockList = () => {
    const Menu = new grammy_1.InlineKeyboard();
    const message = messages_1.SHOW_RESULT_DESCRIPTION;
    Menu.text("Low", "low");
    Menu.text("High", "high");
    Menu.row();
    currentData.forEach((data) => {
        Menu.text(data.type ? "🟢" : "🔴");
        Menu.text(data.price);
        Menu.text(data.value);
        Menu.row();
    });
    return { message, menu: Menu };
};
exports.buildStaticStockList = buildStaticStockList;
const setCurrentData = (data) => {
    if (data === 'low') {
        currentData = lowDataJson_1.lowDataJson;
    }
    else {
        currentData = highDataJson_1.highDataJson;
    }
};
exports.setCurrentData = setCurrentData;
