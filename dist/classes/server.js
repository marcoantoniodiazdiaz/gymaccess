"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const environment_1 = require("../global/environment");
const http_1 = __importDefault(require("http"));
const mongoose_1 = __importDefault(require("mongoose"));
class Server {
    constructor() {
        this.app = express_1.default();
        this.port = environment_1.SERVER_PORT;
        this.mongoConnect();
        this.httpServer = new http_1.default.Server(this.app);
    }
    mongoConnect() {
        mongoose_1.default.connect('mongodb://localhost:27017/gymaccess', 
        //'mongodb+srv://marco_diaz:pataPON3@cluster0-jm5fl.mongodb.net/sautdiaz?retryWrites=true&w=majority',
        //URL_DB,
        { useNewUrlParser: true, useCreateIndex: true }, (err) => {
            if (err)
                throw err;
            console.log('Atlas conectado');
        });
    }
    static get instance() {
        return this._instance || (this._instance = new this());
    }
    start(callback) {
        this.httpServer.listen(this.port, callback);
    }
}
exports.default = Server;
