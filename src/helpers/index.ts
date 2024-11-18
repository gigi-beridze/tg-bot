import { InlineKeyboard } from "grammy";
import { highDataJson } from "../data/highDataJson";
import { lowDataJson } from "../data/lowDataJson";
import { SHOW_RESULT_DESCRIPTION } from "../constants/messages";

let currentData = highDataJson;

export const buildStaticStockList = (): { message: string; menu: InlineKeyboard } => {
    const Menu = new InlineKeyboard();
    const message = SHOW_RESULT_DESCRIPTION;

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

export const setCurrentData = (data: 'high' | 'low') => {
    if (data === 'low') {
        currentData = lowDataJson;
    } else {
        currentData = highDataJson;
    }
};
