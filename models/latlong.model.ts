import mongoose, { Schema, Document } from 'mongoose';
import { ObjectId } from 'mongodb';

export interface ILatLong extends Document {
    lat: string
    lon: string
}

const LatLongSchema: Schema = new Schema({
    lat: {
        type: String,
        required: ['true', 'El campo "lat" es obligatorio'],
    },
    lon: {
        type: String,
        required: ['true', 'El campo "lon" es obligatorio'],
    },
});


// Export the model and return your ILatLong interface
export default mongoose.model<ILatLong>('LatLong', LatLongSchema);