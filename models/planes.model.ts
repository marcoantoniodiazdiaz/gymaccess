import mongoose, { Schema, Document } from 'mongoose';
import { ObjectId } from 'mongodb';

export interface IPlanes extends Document {
    nombre: string
    limitado: boolean
    descripcion: string
    precio: number
    visitas: number
}

const PlanesSchema: Schema = new Schema({
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
    visitas: {
        type: Number,
        required: ['true', 'El campo "visitas" es obligatorio'],
    },

});


// Export the model and return your IPlanes interface
export default mongoose.model<IPlanes>('Planes', PlanesSchema);