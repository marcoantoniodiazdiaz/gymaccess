import express from 'express';
import { SERVER_PORT } from '../global/environment';
import http from 'http';
import mongoose from 'mongoose';

export default class Server {
  private static _instance: Server;
  public app: express.Application;
  public port: number;

  private httpServer: http.Server;

  private constructor() {
    this.app = express();
    this.port = SERVER_PORT;
    this.mongoConnect();

    this.httpServer = new http.Server(this.app);
  }

  private mongoConnect() {
    mongoose.connect('mongodb://127.0.0.1:27017/gymaccess',
      //'mongodb+srv://marco_diaz:pataPON3@cluster0-jm5fl.mongodb.net/sautdiaz?retryWrites=true&w=majority',
      //URL_DB,
      { useNewUrlParser: true, useCreateIndex: true },
      (err) => {
        if (err) throw err;
        console.log('Atlas conectado');
      }
    );
  }

  public static get instance() {
    return this._instance || (this._instance = new this());
  }

  start(callback: Function) {
    this.httpServer.listen(this.port, callback);
  }
}
