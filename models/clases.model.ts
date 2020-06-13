import mongoose, { Schema, Document } from 'mongoose';
import { ObjectId } from 'mongodb';

export interface IClases extends Document {
    nombre: string
}

const ClasesSchema: Schema = new Schema({
    nombre: {
        type: String,
        required: ['true', 'El campo "nombre" es obligatorio'],
    },
});


// Export the model and return your IClases interface
export default mongoose.model<IClases>('Clases', ClasesSchema);