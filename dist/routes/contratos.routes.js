"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("./router");
const contratos_model_1 = __importDefault(require("../models/contratos.model"));
router_1.app.get('/contratos', (req, res) => {
    contratos_model_1.default.find()
        .populate('usuario')
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
router_1.app.get('/contratos/usuario/:usuario', (req, res) => {
    const id = req.params.usuario;
    contratos_model_1.default.find({ usuario: id })
        .populate('usuario')
        .populate('plan')
        .sort({ fecha: 1 })
        .exec((err, data) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        const hoy = new Date();
        data = data.filter((e) => {
            let caducidad = new Date(e.fecha);
            caducidad.setDate(caducidad.getDate() + 30);
            console.log('Ahora:' + hoy.getHours() + hoy.getMonth());
            console.log('Caduca:' + caducidad.getHours() + hoy.getMonth());
            return (hoy < caducidad);
        });
        res.json({
            ok: true,
            data
        });
    });
});
router_1.app.post('/contratos', (req, res) => {
    let body = req.body;
    let values = new contratos_model_1.default({
        usuario: body.usuario,
        plan: body.plan,
        fecha: new Date().toISOString().toString(),
        visitas: body.visitas,
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
router_1.app.put('/contratos/remove/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.params.id;
    let visitas;
    const valorAnterior = yield contratos_model_1.default.findById(id, 'visitas');
    if (valorAnterior) {
        const value = valorAnterior.visitas;
        if (value !== null) {
            console.log('Entre');
            if (value === 0) {
                console.log('Cero');
                return res.status(400).json({
                    ok: false,
                    err: 'Visitas agotadas'
                });
            }
            if (value !== -1) {
                visitas = value - 1;
            }
            else {
                visitas = value;
            }
        }
    }
    // console.log(visitas)
    contratos_model_1.default.findByIdAndUpdate(id, { visitas }, { new: true, runValidators: true }, (err, data) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            data: 'Cambio almacenado',
            visitas: visitas
        });
    });
}));
router_1.app.put('/contratos/add/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.params.id;
    let visitas;
    const valorAnterior = yield contratos_model_1.default.findById(id, 'visitas');
    if (valorAnterior) {
        if (valorAnterior.visitas) {
            if (valorAnterior.visitas !== -1) {
                visitas = valorAnterior.visitas + 1;
            }
        }
        else {
            return res.status(400).json({
                ok: false,
                err: 'Visitas agotadas'
            });
        }
    }
    contratos_model_1.default.findByIdAndUpdate(id, { visitas }, { new: true, runValidators: true }, (err, data) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            data: 'Cambio almacenado',
            visitas: visitas
        });
    });
}));
exports.default = router_1.app;
