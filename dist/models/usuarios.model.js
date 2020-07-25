"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const UsuariosSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: ['true', 'El campo "nombre" es obligatorio'],
    },
    nac: {
        type: String,
        default: null
    },
    estatura: {
        type: Number,
        default: null
    },
    peso: {
        type: Number,
        default: null
    },
    telefono: {
        type: String,
        default: null
    },
    foto: {
        type: String,
        required: ['true', 'El campo "foto" es obligatorio'],
    },
    password: {
        type: String,
        required: ['true', 'El campo "password" es obligatorio'],
    },
    email: {
        type: String,
        unique: true,
        required: ['true', 'El campo "nombre" es obligatorio'],
    },
    notificaciones: {
        type: Number,
        default: 1
    },
});
// Export the model and return your IUsuarios interface
exports.default = mongoose_1.default.model('Usuarios', UsuariosSchema);
