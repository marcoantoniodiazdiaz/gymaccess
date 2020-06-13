"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql");
class MySQL {
    constructor() {
        this.conectado = false;
        console.log('Clase inicializada');
        this.cnn = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'gymaccess_db',
            socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
        });
        this.conectarDB();
    }
    static get instance() {
        return this._instance || (this._instance = new this());
    }
    static escaped(value) {
        return MySQL.instance.cnn.escape(value);
    }
    static executeQuery(query, callback) {
        this._instance.cnn.query(query, (err, results, fields) => {
            if (err) {
                console.log('Error en Query');
                console.log(err);
                return callback(err);
            }
            callback(null, results);
        });
    }
    conectarDB() {
        this.cnn.connect((err) => {
            if (err) {
                console.log("Error" + err.message);
            }
            this.conectado = true;
            console.log('Base de datos ONLINE');
        });
    }
}
exports.default = MySQL;
