"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("./router");
const _ = __importStar(require("underscore"));
const imagenes_model_1 = __importDefault(require("../models/imagenes.model"));
router_1.app.get('/imagenes/gym/:gym', (req, res) => {
    const gym = req.params.gym;
    imagenes_model_1.default.find({ gym })
        .populate({
        path: 'gym',
        populate: ['resenas', 'clase']
    })
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
router_1.app.get('/imagenes/:id', (req, res) => {
    const id = req.params.id;
    imagenes_model_1.default.findById(id)
        .populate('usuario')
        .populate('gym')
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
router_1.app.post('/imagenes', (req, res) => {
    let body = req.body;
    let values = new imagenes_model_1.default({
        usuario: body.usuario,
        gym: body.gym,
        url: body.url,
    });
    imagenes_model_1.default.create(values, (err, data) => {
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
router_1.app.put('/imagenes/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, [
        'url',
    ]);
    imagenes_model_1.default.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, data) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            data: data
        });
    });
});
router_1.app.delete('/imagenes/:id', (req, res) => {
    let id = req.params.id;
    imagenes_model_1.default.findByIdAndRemove(id, (err, data) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            data: data
        });
    });
});
exports.default = router_1.app;
