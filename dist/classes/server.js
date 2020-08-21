"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const environment_1 = require("../global/environment");
const http_1 = __importDefault(require("http"));
const mongoose_1 = __importDefault(require("mongoose"));
const socket_io_1 = __importDefault(require("socket.io"));
// import * as socket from '../sockets/socket';
class Server {
    constructor() {
        this.app = express_1.default();
        this.port = environment_1.SERVER_PORT;
        this.httpServer = new http_1.default.Server(this.app);
        console.log('🎛   [GymAccess Server]');
        this.io = socket_io_1.default(this.httpServer);
        this.escucharSockets();
        this.mongoConnect();
    }
    mongoConnect() {
        mongoose_1.default.connect('mongodb://127.0.0.1:27017/gymaccess', 
        //'mongodb+srv://marco_diaz:pataPON3@cluster0-jm5fl.mongodb.net/sautdiaz?retryWrites=true&w=majority',
        //URL_DB,
        { useNewUrlParser: true, useCreateIndex: true }, (err) => {
            if (err)
                throw err;
            console.log('🟢  Conexión de MongoDB en linea');
        });
    }
    escucharSockets() {
        console.log('🟢  Servidor real-time en linea');
        this.io.on('connection', cliente => {
            // Conectar cliente
            cliente.on('nueva-cita', () => {
                this.io.emit('actualizar-cita');
            });
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
