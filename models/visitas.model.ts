import mongoose, { Schema, Document } from 'mongoose';
import { ObjectId } from 'mongodb';

export interface IVisitas extends Document {
    gym: string
    usuario: string
    fecha: string
}

const VisitasSchema: Schema = new Schema({
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
    fecha: {
        type: String,
        required: ['true', 'El campo "fecha" es obligatorio'],
    },
});


// Export the model and return your IVisitas interface
export default mongoose.model<IVisitas>('Visitas', VisitasSchema);