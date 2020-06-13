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
const ImagenesSchema = new mongoose_1.Schema({
    usuario: {
        type: mongodb_1.ObjectId,
        ref: 'Usuarios',
        required: ['true', 'El campo "usuario" es obligatorio'],
    },
    gym: {
        type: mongodb_1.ObjectId,
        ref: 'Gyms',
        required: ['true', 'El campo "gym" es obligatorio'],
    },
    url: {
        type: String,
        required: ['true', 'El campo "url" es obligatorio'],
    },
});
// Export the model and return your IImagenes interface
exports.default = mongoose_1.default.model('Imagenes', ImagenesSchema);
