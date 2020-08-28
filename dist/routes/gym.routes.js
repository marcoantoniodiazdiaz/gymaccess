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
const gyms_model_1 = __importDefault(require("../models/gyms.model"));
const _ = __importStar(require("underscore"));
const bcrypt_1 = __importDefault(require("bcrypt"));
router_1.app.get('/gym', (req, res) => {
    gyms_model_1.default.find({ active: true }).populate('clase')
        .populate('resenas').sort({ nombre: 1 }).exec((err, data) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            data,
        });
    });
});
router_1.app.get('/gym/:id', (req, res) => {
    const id = req.params.id;
    gyms_model_1.default.findById(id).populate('clase').sort({
        nombre: 1
    }).exec((err, data) => {
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
router_1.app.get('/gym/nombre/:nombre', (req, res) => {
    const nombre = req.params.nombre;
    let regex = new RegExp(nombre);
    gyms_model_1.default.find({
        nombre: {
            $regex: regex,
            $options: 'i'
        }
    }).populate('clase').sort({
        nombre: 1
    }).exec((err, data) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        console.log(data);
        res.json({
            ok: true,
            data
        });
    });
});
router_1.app.post('/gym', (req, res) => {
    let body = req.body;
    body.password = bcrypt_1.default.hashSync(body.password, 10);
    let product = new gyms_model_1.default({
        email: body.email,
        password: body.password,
        direccion: body.direccion,
        logo: body.logo,
        nombre: body.nombre,
        clase: body.clase,
        descripcion: body.descripcion,
        telefono: body.telefono,
        lat: body.lat,
        lon: body.lon,
    });
    gyms_model_1.default.create(product, (err, data) => {
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
router_1.app.put('/gym/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, [
        'password',
        'direccion',
        'logo',
        'nombre',
        'clase',
        'descripcion',
        'telefono',
        'lat',
        'lon',
        'open',
        'close',
        'openDay',
        'closeDay',
    ]);
    gyms_model_1.default.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, data) => {
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
router_1.app.put('/gym/delete/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, [
        'active',
    ]);
    gyms_model_1.default.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, data) => {
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
