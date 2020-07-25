import mongoose, { Schema, Document, SchemaTypes } from 'mongoose';
import { ObjectId } from 'mongodb';

export interface IReservaciones extends Document {
    usuario: string
    fecha: string
    gym: string
    active: boolean
}

const ReservacionesSchema: Schema = new Schema({
    usuario: {
        type: ObjectId,
        ref: 'Usuarios',
        required: ['true', 'El campo "usuario" es obligatorio'],
    },
    fecha: {
        type: String,
        required: ['true', 'El campo "fecha" es obligatorio'],
    },
    gym: {
        type: ObjectId,
        ref: 'Gyms',
        required: ['true', 'El campo "gym" es obligatorio'],
    },
    active: {
        type: Boolean,
        default: true,
    },
});


// Export the model and return your IReservaciones interface
export default mongoose.model<IReservaciones>('Reservaciones', ReservacionesSchema);