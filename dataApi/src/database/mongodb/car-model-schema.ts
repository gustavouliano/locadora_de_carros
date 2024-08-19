import { Schema, model } from 'mongoose'

export interface ICarModelSchema {
    name: String,
    brand: String,
    airbag: Boolean,
    abs: Boolean
}

const carModelSchema = new Schema<ICarModelSchema>({
    name: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    airbag: {
        type: Boolean,
        default: false
    },
    abs: {
        type: Boolean,
        default: false
    }
});

const ModelCarModel = model<ICarModelSchema>('CarModel', carModelSchema);

export default ModelCarModel;