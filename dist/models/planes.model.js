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
const PlanesSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: ['true', 'El campo "nombre" es obligatorio'],
    },
    limitado: {
        type: Boolean,
        required: ['true', 'El campo "limitado" es obligatorio'],
    },
    descripcion: {
        type: String,
        required: ['true', 'El campo "descripcion" es obligatorio'],
    },
    precio: {
        type: Number,
        required: ['true', 'El campo "precio" es obligatorio'],
    },
});
// Export the model and return your IPlanes interface
exports.default = mongoose_1.default.model('Planes', PlanesSchema);
