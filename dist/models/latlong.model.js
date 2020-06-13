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
const LatLongSchema = new mongoose_1.Schema({
    lat: {
        type: String,
        required: ['true', 'El campo "lat" es obligatorio'],
    },
    lon: {
        type: String,
        required: ['true', 'El campo "lon" es obligatorio'],
    },
});
// Export the model and return your ILatLong interface
exports.default = mongoose_1.default.model('LatLong', LatLongSchema);
