import express from 'express';
import { SERVER_PORT } from '../global/environment';
import http from 'http';
import mongoose from 'mongoose';
import socketIO from 'socket.io';

// import * as socket from '../sockets/socket';

export default class Server {
  private static _instance: Server;
  public app: express.Application;
  public port: number;

  public io: socketIO.Server;
  private httpServer: http.Server;

  private constructor() {
    this.app = express();
    this.port = SERVER_PORT;
    this.httpServer = new http.Server(this.app);

    console.log('🎛   [GymAccess Server]');

    this.io = socketIO(this.httpServer);
    this.escucharSockets();
    this.mongoConnect();

  }

  private mongoConnect() {
    mongoose.connect('mongodb://127.0.0.1:27017/gymaccess',
      //'mongodb+srv://marco_diaz:pataPON3@cluster0-jm5fl.mongodb.net/sautdiaz?retryWrites=true&w=majority',
      //URL_DB,
      { useNewUrlParser: true, useCreateIndex: true },
      (err) => {
        if (err) throw err;
        console.log('🟢  Conexión de MongoDB en linea');
      }
    );
  }

  private escucharSockets() {
    console.log('🟢  Servidor real-time en linea');

    this.io.on('connection', cliente => {
      // Conectar cliente
      cliente.on('nueva-cita', () => {
        this.io.emit('actualizar-cita');
      });
    });

  }

  public static get instance() {
    return this._instance || (this._instance = new this());
  }

  start(callback: any) {

    this.httpServer.listen(this.port, callback);
  }
}
