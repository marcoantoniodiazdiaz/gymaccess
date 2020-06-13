import mongoose, { Schema, Document } from 'mongoose';
import { ObjectId } from 'mongodb';

export interface IImagenes extends Document {
    usuario: string
    gym: string
    url: string
}

const ImagenesSchema: Schema = new Schema({
    usuario: {
        type: ObjectId,
        ref: 'Usuarios',
        required: ['true', 'El campo "usuario" es obligatorio'],
    },
    gym: {
        type: ObjectId,
        ref: 'Gyms',
        required: ['true', 'El campo "gym" es obligatorio'],
    },
    url: {
        type: String,
        required: ['true', 'El campo "url" es obligatorio'],
    },
});


// Export the model and return your IImagenes interface
export default mongoose.model<IImagenes>('Imagenes', ImagenesSchema);