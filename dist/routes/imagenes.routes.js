"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
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
exports.default = router_1.app;
