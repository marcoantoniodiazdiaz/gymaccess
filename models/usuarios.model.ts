import mongoose, { Schema, Document } from 'mongoose';
import { ObjectId } from 'mongodb';

export interface IUsuarios extends Document {
    nombre: string
    nac: string
    estatura: number
    peso: number
    telefono: string
    foto: string
    password: string
    email: string
    notificacione: boolean
    active: boolean
}

const UsuariosSchema: Schema = new Schema({
    nombre: {
        type: String,
        required: ['true', 'El campo "nombre" es obligatorio'],
    },
    nac: {
        type: String,
        default: null
    },
    estatura: {
        type: Number,
        default: null
    },
    peso: {
        type: Number,
        default: null
    },
    telefono: {
        type: String,
        default: null
    },
    foto: {
        type: String,
        required: ['true', 'El campo "foto" es obligatorio'],
    },
    password: {
        type: String,
        required: ['true', 'El campo "password" es obligatorio'],
    },
    email: {
        type: String,
        unique: true,
        required: ['true', 'El campo "nombre" es obligatorio'],
    },
    notificaciones: {
        type: Number,
        default: 1
    },
    active: {
        type: Boolean,
        default: true,
    },
});

// Export the model and return your IUsuarios interface
export default mongoose.model<IUsuarios>('Usuarios', UsuariosSchema);