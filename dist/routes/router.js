"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mysql_1 = __importDefault(require("../database/mysql"));
const app = express_1.Router();
exports.app = app;
app.get('/status', (req, res) => {
    const query = ` SELECT * FROM usuarios `;
    mysql_1.default.executeQuery(query, (err, data) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                error: err
            });
        }
        else {
            return res.json({
                ok: true,
                data
            });
        }
    });
});
exports.default = app;
