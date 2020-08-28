"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = require("express");
const app = express_1.Router();
exports.app = app;
app.get('/status', (req, res) => {
    res.json({
        ok: true,
    });
});
exports.default = app;
