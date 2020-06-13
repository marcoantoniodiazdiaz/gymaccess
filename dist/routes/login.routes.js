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
const mysql_1 = __importDefault(require("../database/mysql"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt = __importStar(require("jsonwebtoken"));
router_1.app.post('/login', (req, res) => {
    let body = req.body;
    if (body.password === "" || body.email === "") {
        return res.status(400).json({
            ok: false,
            err: 'Los campos son invalidos'
        });
    }
    const query = `
    SELECT u.id, u.nombre, u.email, u.password FROM usuarios as u WHERE u.email = ${mysql_1.default.escaped(body.email)}
    `;
    mysql_1.default.executeQuery(query, (erro, data) => {
        if (erro) {
            console.log(erro);
            return res.status(400).json({
                ok: false,
                err: 'Error de conexion',
                erro // TODO: QUITAR ESTO
            });
        }
        if (data.length === 0) {
            return res.status(400).json({
                ok: false,
                err: 'El usuario no esta registrado'
            });
        }
        if (!bcrypt_1.default.compareSync(body.password, data[0]['password'])) {
            return res.status(400).json({
                ok: false,
                err: 'El email o la contraseña son incorrectos'
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
