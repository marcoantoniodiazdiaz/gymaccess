import mongoose, { Schema, Document } from 'mongoose';
import { ObjectId } from 'mongodb';

export interface IContratos extends Document {
    gym: string
    usuario: string
    plan: string
    fecha: string
}

const ContratosSchema: Schema = new Schema({
    gym: {
        type: ObjectId,
        ref: 'Gyms',
        required: ['true', 'El campo "gym" es obligatorio'],
    },
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
});


// Export the model and return your IContratos interface
export default mongoose.model<IContratos>('Contratos', ContratosSchema);