import { BotCommand } from "grammy/types";

export const BOT_COMMANDS: readonly BotCommand[] = [
    { command: 'start', description: 'Start interacting with the bot!' },
    { command: 'show_stocks', description: 'Showing stocks!' }
];