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
const jwt = __importStar(require("jsonwebtoken"));
const usuarios_model_1 = __importDefault(require("../models/usuarios.model"));
const gyms_model_1 = __importDefault(require("../models/gyms.model"));
router_1.app.post('/login', (req, res) => {
    let body = req.body;
    if (body.password === "" || body.email === "") {
        return res.status(400).json({
            ok: false,
            err: 'Los campos son invalidos'
        });
    }
    usuarios_model_1.default.findOne({ email: body.email }).exec((err, data) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if (!data) {
            return res.status(400).json({
                ok: false,
                err: 'No hay ninguna cuenta asociada a este correo electronico'
            });
        }
        if (!bcrypt_1.default.compareSync(body.password, data.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'La contraseña es incorrecta'
                }
            });
        }
        let token = jwt.sign({ data }, "jkw~3bBCCg*aU^XZ2ywmKru2.=P{v-9vNp(B$w'J'KK<ufC4g$", { expiresIn: '60d' });
        res.json({
            ok: true,
            data,
            token
        });
    });
});
router_1.app.post('/login/gym', (req, res) => {
    let body = req.body;
    if (body.password === "" || body.email === "") {
        return res.status(400).json({
            ok: false,
            err: 'Los campos son invalidos'
        });
    }
    gyms_model_1.default.findOne({ email: body.email }).exec((err, data) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if (!data) {
            return res.status(400).json({
                ok: false,
                err: 'No hay ninguna cuenta asociada a este correo electronico'
            });
        }
        if (!bcrypt_1.default.compareSync(body.password, data.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'La contraseña es incorrecta'
                }
            });
        }
        let token = jwt.sign({ data }, "jkw~3bBCCg*aU^XZ2ywmKru2.=P{v-9vNp(B$w'J'KK<ufC4g$", { expiresIn: '60d' });
        res.json({
            ok: true,
            data,
            token
        });
    });
});
exports.default = router_1.app;
