"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("./router");
const gyms_model_1 = __importDefault(require("../models/gyms.model"));
const _ = __importStar(require("underscore"));
const bcrypt_1 = __importDefault(require("bcrypt"));
router_1.app.get('/gym', (req, res) => {
    gyms_model_1.default.find().populate('clase')
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
