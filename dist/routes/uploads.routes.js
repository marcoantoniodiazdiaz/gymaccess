"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const fs_1 = __importDefault(require("fs"));
const router_1 = require("./router");
const path_1 = __importDefault(require("path"));
router_1.app.use(express_fileupload_1.default());
router_1.app.put('/upload/:type', (req, res) => {
    const type = req.params.type;
    if (!req.files) {
        return res.status(400).json({
            ok: 'false',
            err: 'No se a seleccionado ningun archivo'
        });
    }
    let types = ['user_profile', 'gym_profile'];
    if (types.indexOf(type) < 0) {
        return res.status(400).json({
            ok: 'false',
            err: 'El archivo no es un tipo valido'
        });
    }
    let file = req.files.file;
    let nombreCortado = file.name.split('.');
    let ex = nombreCortado[nombreCortado.length - 1];
    // Extensiones permitidas
    let extensiones = ['png', 'jpg', 'jpeg'];
    if (extensiones.indexOf(ex) < 0) {
        return res.status(400).json({
            ok: 'false',
            err: 'El archivo tiene una extension no invalida'
        });
    }
    const date = new Date();
    let nombreSubir = `${type}${date.getFullYear()}${date.getMonth()}${date.getDay()}${date.getHours()}${date.getSeconds()}${date.getMilliseconds()}`;
    file.mv(`dist/uploads/${nombreSubir}.${ex}`, (err) => {
        if (err) {
            return res.json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            message: 'Subido correctamente',
            name: `${nombreSubir}.${ex}`
        });
    });
});
router_1.app.get('/upload/:filename', (req, res) => {
    const filename = req.params.filename;
    let pathImg = path_1.default.resolve(__dirname, `../uploads/${filename}`);
    if (fs_1.default.existsSync(pathImg)) {
        res.sendFile(pathImg);
    }
    else {
        res.status(400).json({
            ok: false,
            message: 'Imagen no encontrada',
            pathImg
        });
    }
});
exports.default = router_1.app;
