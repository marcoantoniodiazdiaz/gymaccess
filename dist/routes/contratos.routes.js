"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("./router");
const contratos_model_1 = __importDefault(require("../models/contratos.model"));
router_1.app.get('/contratos', (req, res) => {
    contratos_model_1.default.find()
        .populate('usuario')
        .populate('gym')
        .populate('plan')
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
router_1.app.get('/contratos/:id', (req, res) => {
    const id = req.params.id;
    contratos_model_1.default.findById(id)
        .populate('usuario')
        .populate('gym')
        .populate('plan')
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
router_1.app.post('/contratos', (req, res) => {
    let body = req.body;
    let values = new contratos_model_1.default({
        gym: body.gym,
        usuario: body.usuario,
        plan: body.plan,
        fecha: new Date().toISOString().toString(),
    });
    contratos_model_1.default.create(values, (err, data) => {
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
