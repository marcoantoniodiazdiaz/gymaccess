import mongoose, { Schema, Document } from 'mongoose';
import { ObjectId } from 'mongodb';

export interface IContratos extends Document {
    usuario: string
    plan: string
    fecha: string
    visitas: number
    active: boolean
}

const ContratosSchema: Schema = new Schema({
    usuario: {
        type: ObjectId,
        ref: 'Usuarios',
        required: ['true', 'El campo "usuario" es obligatorio'],
    },
    plan: {
        type: ObjectId,
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
    active: {
        type: Boolean,
        default: true,
    },
});


// Export the model and return your IContratos interface
export default mongoose.model<IContratos>('Contratos', ContratosSchema);