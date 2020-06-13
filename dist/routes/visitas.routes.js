"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("./router");
const visitas_model_1 = __importDefault(require("../models/visitas.model"));
router_1.app.get('/visitas', (req, res) => {
    visitas_model_1.default.find()
        .sort({ fecha: 1 })
        .populate('gym')
        .populate('usuario')
        .exec((err, data) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            data
        });
    });
});
router_1.app.get('/visitas/:id', (req, res) => {
    const id = req.params.id;
    visitas_model_1.default.findById(id)
        .populate('usuario')
        .populate('gym')
        .sort({ fecha: 1 })
        .exec((err, data) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            data
        });
    });
});
router_1.app.post('/visitas', (req, res) => {
    let body = req.body;
    let values = new visitas_model_1.default({
        gym: body.gym,
        usuario: body.usuario,
        fecha: new Date().toISOString().toString(),
    });
    visitas_model_1.default.create(values, (err, data) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            data
        });
    });
});
exports.default = router_1.app;
