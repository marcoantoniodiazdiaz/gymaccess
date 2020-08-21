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
const nodemailer_1 = __importDefault(require("nodemailer"));
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
    body.email = body.email.trim();
    const firstPass = body.password;
    body.password = bcrypt_1.default.hashSync(body.password, 10);
    let values = new usuarios_model_1.default({
        nombre: body.nombre,
        foto: body.foto,
        password: body.password,
        email: body.email,
        nac: new Date().toISOString(),
    });
    usuarios_model_1.default.create(values, (err, data) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        const transporter = nodemailer_1.default.createTransport({
            host: 'mail.gymaccess.com.mx',
            port: 465,
            // secure: false,
            auth: {
                user: 'direccion@gymaccess.com.mx',
                pass: 'B8OfGAysT1]i'
            }
        });
        const contentHTML = `
        <html>

        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
        </head>
        
        <body style="background-color: rgb(244, 244, 244);">
            <div style="width: 100%; height: 150px; background-color: rgb(231, 68, 54); padding-top: 30px;">
                <div class="container text-center" style="background-color: white; padding: 50px; ">
                    <h1>Bienvenido a GymAccess.</h1>
                    <img src="https://res.cloudinary.com/dttt56lma/image/upload/v1597962979/fdphkrkvj4adwcv6oene.png" height="60px " class="mt-4 "><br>
                    <p class="mt-3 " style="font-size: 130%; ">Nos complace en darle la bienvenida a nuestro sistema</p>
                    <div class="text-left mt-5 ">
                        <span>Sus credenciales de registro son:</span><br>
                        <span><strong>Email:</strong> ${body.email}</span><br>
                        <span><strong>Contraseña:</strong> ${firstPass}</span><br>
                        <span>Luego de ingresar usted puede cambiar su contraseña en el apartado de perfil.</span>
                    </div>
                </div>
                <div class="container text-center mb-5" style="background-color: rgb(231, 68, 54); padding: 30px; ">
                    <strong style="font-size: 120%; ">¿Nesesitas ayuda?</strong><br>
                    <span style="color: white; text-decoration: underline; ">Sigue este enlace y podemos contestar tus preguntas</span>
                </div>
            </div>
        </body>
        
        </html>
        `;
        const info = yield transporter.sendMail({
            from: "'Dirección GymAccess' <direccion@gymaccess.com.mx>",
            to: data.email,
            subject: 'Bienvenido a GymAccess',
            html: contentHTML,
        });
        res.json({
            ok: true,
            data,
            email: info.messageId
        });
    }));
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
