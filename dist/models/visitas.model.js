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
const VisitasSchema = new mongoose_1.Schema({
    gym: {
        type: mongodb_1.ObjectId,
        ref: 'Gyms',
        required: ['true', 'El campo "gym" es obligatorio'],
    },
    usuario: {
        type: mongodb_1.ObjectId,
        ref: 'Usuarios',
        required: ['true', 'El campo "usuario" es obligatorio'],
    },
    fecha: {
        type: String,
        required: ['true', 'El campo "fecha" es obligatorio'],
    },
});
// Export the model and return your IVisitas interface
exports.default = mongoose_1.default.model('Visitas', VisitasSchema);