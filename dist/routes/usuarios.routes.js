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
const bcrypt_1 = __importDefault(require("bcrypt"));
const _ = __importStar(require("underscore"));
const usuarios_model_1 = __importDefault(require("../models/usuarios.model"));
router_1.app.get('/usuarios', (req, res) => {
    usuarios_model_1.default.find({ active: true }).sort({ nombre: 1 }).exec((err, data) => {
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
router_1.app.get('/usuarios/:id', (req, res) => {
    const id = req.params.id;
    usuarios_model_1.default.findById(id).sort({
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
router_1.app.post('/usuarios', (req, res) => {
    let body = req.body;
    body.email = body.email.trim(),
        body.password = bcrypt_1.default.hashSync(body.password, 10);
    let values = new usuarios_model_1.default({
        nombre: body.nombre,
        foto: body.foto,
        password: body.password,
        email: body.email,
        nac: new Date().toISOString(),
    });
    usuarios_model_1.default.create(values, (err, data) => {
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
// UserExists
router_1.app.get('/usuarios/exists/email/:email', (req, res) => {
    const email = req.params.email;
    usuarios_model_1.default.findOne({ email }).exec((err, data) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if (!data) {
            return res.status(400).json({
                ok: false,
                data: false
            });
        }
        res.json({
            ok: true,
            data: true
        });
    });
});
router_1.app.put('/usuarios/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, [
        'nombre',
        'nac',
        'estatura',
        'peso',
        'telefono',
        'foto',
        'password',
        'notificaciones',
    ]);
    usuarios_model_1.default.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, data) => {
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
router_1.app.put('/usuarios/delete/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, [
        'active',
    ]);
    usuarios_model_1.default.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, data) => {
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
