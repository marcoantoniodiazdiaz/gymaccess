import mongoose, { Schema, Document } from 'mongoose';
import { ObjectId } from 'mongodb';

export interface IArchivos extends Document {
    nombre: string
    url: string
    tipo: string
    fecha: string
    active: boolean
}

const ArchivosSchema: Schema = new Schema({
    nombre: {
        type: String,
        required: ['true', 'El campo "nombre" es obligatorio'],
    },
    url: {
        type: String,
        required: ['true', 'El campo "url" es obligatorio'],
    },

    /*
        DESAYUNOS
        ALMUERZOS
        CENAS
    */

    tipo: {
        type: String,
        required: ['true', 'El campo "tipo" es obligatorio'],
    },
    fecha: {
        type: String,
        required: ['true', 'El campo "fecha" es obligatorio'],
    },
    active: {
        type: String,
        default: true,
    },
});

// Export the model and return your IArchivos interface
export default mongoose.model<IArchivos>('Archivos', ArchivosSchema);