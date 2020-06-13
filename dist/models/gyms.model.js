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
const mongodb_1 = require("mongodb");
const GymSchema = new mongoose_1.Schema({
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
    latlong: {
        type: String,
        ref: 'LatLong',
        required: ['true', 'El campo "latlong" es obligatorio'],
    },
});
// Export the model and return your IGyms interface
exports.default = mongoose_1.default.model('Gyms', GymSchema);
