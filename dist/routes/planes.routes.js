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
const planes_model_1 = __importDefault(require("../models/planes.model"));
router_1.app.get('/planes', (req, res) => {
    planes_model_1.default.find()
        .populate('acepta')
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
router_1.app.get('/planes/limitados/:limitado', (req, res) => {
    const limitado = req.params.limitado;
    planes_model_1.default.find({
        limitado
    })
        .sort({
        precio: 1,
    })
        .populate('acepta')
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
router_1.app.get('/planes/:id', (req, res) => {
    const id = req.params.id;
    planes_model_1.default.findById(id)
        .populate('acepta')
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
router_1.app.post('/planes', (req, res) => {
    let body = req.body;
    let values = new planes_model_1.default({
        nombre: body.nombre,
        limitado: body.limitado,
        descripcion: body.descripcion,
        precio: body.precio,
        visitas: body.visitas,
    });
    planes_model_1.default.create(values, (err, data) => {
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
router_1.app.put('/planes/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, [
        'nombre',
        'limitado',
        'descripcion',
        'precio',
        'visitas'
    ]);
    planes_model_1.default.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, data) => {
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
