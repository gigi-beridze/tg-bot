import { Bot } from "grammy";
import { ILogObj, Logger } from "tslog";
import { setUpBot } from "./src/init/setUpBot";
import { EventEmitter } from "stream";

require('dotenv').config();

const token = process.env.BOT_TOKEN;

if(!token) {
    throw new Error("Declare BOT_TOKEN in .env file in the root of the project");
}

export const logger: Logger<ILogObj> = new Logger();
export const emitter: EventEmitter = new EventEmitter();

const bot = new Bot(token);

setUpBot(bot);