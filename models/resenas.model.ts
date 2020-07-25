import mongoose, { Schema, Document } from 'mongoose';
import { ObjectId } from 'mongodb';

export interface IResenas extends Document {
    usuario: string,
    descripcion: string,
    calificacion: number
}

const ResenasSchema: Schema = new Schema({
    usuario: {
        ref: 'Usuarios',
        type: ObjectId,
        unique: true,
        required: ['true', 'El campo "usuario" es obligatorio'],
    },
    descripcion: {
        type: String,
        required: ['true', 'El campo "descripcion" es obligatorio'],
    },
    calificacion: {
        type: Number,
        required: ['true', 'El campo "calificacion" es obligatorio'],
    },
});


// Export the model and return your IResenas interface
export default mongoose.model<IResenas>('Resenas', ResenasSchema);