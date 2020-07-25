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
const ContratosSchema = new mongoose_1.Schema({
    usuario: {
        type: mongodb_1.ObjectId,
        ref: 'Usuarios',
        required: ['true', 'El campo "usuario" es obligatorio'],
    },
    plan: {
        type: mongodb_1.ObjectId,
        ref: 'Planes',
        required: ['true', 'El campo "plan" es obligatorio'],
    },
    fecha: {
        type: String,
        required: ['true', 'El campo "fecha" es obligatorio'],
    },
    visitas: {
        type: Number,
        required: ['true', 'El campo "visitas" es obligatorio'],
    },
});
// Export the model and return your IContratos interface
exports.default = mongoose_1.default.model('Contratos', ContratosSchema);
