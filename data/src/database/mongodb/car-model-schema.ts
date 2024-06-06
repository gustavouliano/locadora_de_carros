import { Schema, model } from 'mongoose'

interface ICarModelSchema {
    name: String,
    brand: String,
    airbag: Boolean,
    abs: Boolean
}

const carModelSchema = new Schema<ICarModelSchema>({
    name: {
        type: String,
        require: true
    },
    brand: {
        type: String,
        require: true
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