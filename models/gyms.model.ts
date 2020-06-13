import mongoose, { Schema, Document } from 'mongoose';
import { ObjectId } from 'mongodb';

export interface IGyms extends Document {
    direccion: string
    logo: string
    nombre: string
    clase: string
    descripcion: string
    telefono: string
    latlong: string
}

const GymSchema: Schema = new Schema({
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
        type: ObjectId,
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
export default mongoose.model<IGyms>('Gyms', GymSchema);