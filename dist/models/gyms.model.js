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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const mongodb_1 = require("mongodb");
const GymSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: ['true', 'El campo "email" es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: ['true', 'El campo "password" es obligatorio'],
    },
    direccion: {
        type: String,
        required: ['true', 'El campo "direccion" es obligatorio'],
    },
    logo: {
        type: String,
        required: ['true', 'El campo "logo" es obligatorio'],
    },
    nombre: {
        type: String,
        required: ['true', 'El campo "nombre" es obligatorio'],
        unique: true
    },
    clase: {
        type: mongodb_1.ObjectId,
        ref: 'Clases',
        required: ['true', 'El campo "clase" es obligatorio'],
    },
    descripcion: {
        type: String,
        required: ['true', 'El campo "despcripcion" es obligatorio'],
    },
    telefono: {
        type: String,
        required: ['true', 'El campo "telefono" es obligatorio'],
    },
    lat: {
        type: String,
        required: ['true', 'El campo "lat" es obligatorio'],
    },
    lon: {
        type: String,
        required: ['true', 'El campo "lon" es obligatorio'],
    },
    horarios: {
        type: [String],
        default: [],
    },
    active: {
        type: Boolean,
        default: true,
    },
    resenas: [{ type: mongodb_1.ObjectId, ref: 'Resenas' }],
});
// Export the model and return your IGyms interface
exports.default = mongoose_1.default.model('Gyms', GymSchema);
