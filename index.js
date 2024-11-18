"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emitter = exports.logger = void 0;
const grammy_1 = require("grammy");
const tslog_1 = require("tslog");
const setUpBot_1 = require("./src/init/setUpBot");
const stream_1 = require("stream");
require('dotenv').config();
const token = process.env.BOT_TOKEN;
if (!token) {
    throw new Error("Declare BOT_TOKEN in .env file in the root of the project");
}
exports.logger = new tslog_1.Logger();
exports.emitter = new stream_1.EventEmitter();
const bot = new grammy_1.Bot(token);
(0, setUpBot_1.setUpBot)(bot);
