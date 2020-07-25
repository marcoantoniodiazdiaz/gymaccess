"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const app = express_1.Router();
exports.app = app;
app.get('/status', (req, res) => {
});
exports.default = app;
