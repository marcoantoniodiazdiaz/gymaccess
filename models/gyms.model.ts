import mongoose, { Schema, Document } from 'mongoose';
import { ObjectId } from 'mongodb';

export interface IGyms extends Document {
    email: string
    password: string
    direccion: string
    logo: string
    nombre: string
    clase: string
    descripcion: string
    telefono: string
    lat: string;
    lon: string;
    resenas: string;
}

const GymSchema: Schema = new Schema({
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
    lat: {
        type: String,
        required: ['true', 'El campo "lat" es obligatorio'],
    },
    lon: {
        type: String,
        required: ['true', 'El campo "lon" es obligatorio'],
    },
    resenas: [{ type: ObjectId, ref: 'Resenas' }],
});


// Export the model and return your IGyms interface
export default mongoose.model<IGyms>('Gyms', GymSchema);