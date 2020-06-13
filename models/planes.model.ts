import mongoose, { Schema, Document } from 'mongoose';
import { ObjectId } from 'mongodb';

export interface IPlanes extends Document {
    nombre: string
    limitado: string
    descripcion: string
    precio: number
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

});


// Export the model and return your IPlanes interface
export default mongoose.model<IPlanes>('Planes', PlanesSchema);