"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.URL_DB = exports.TOKEN_CAD = exports.GOOGLE_NOTIFICATIONS = exports.SEED = exports.SERVER_PORT = void 0;
exports.SERVER_PORT = Number(process.env.PORT) || 5002;
exports.SEED = 'este-es-el-seed-desarrollo';
exports.GOOGLE_NOTIFICATIONS = 'key=AAAAxsUyi4s:APA91bFJeEHjr5a9LbnbvAutO4Ug9Nktekol_VtRZ6kRW5JrsAsFQI7PyDmKzhYC9E1hhnU_TPePbkDhCfdZhZqIwVee7Z--Xv3PXYzfH3oudMqfrP9LF5-h8wqU7VevrtXLiY5ERc4';
exports.TOKEN_CAD = '60d';
exports.URL_DB = process.env.NODE_ENV === 'dev';
//? 'mongodb+srv://marco_diaz:pataPON3@cluster0-jm5fl.mongodb.net/sautdiaz?retryWrites=true&w=majority'
//: // ? 'mongodb+srv://marco_diaz:pataPON3@cluster0-jm5fl.mongodb.net/sautdiaz?retryWrites=true&w=majority'
'mongodb://localhost:27017/sautdiaz';
