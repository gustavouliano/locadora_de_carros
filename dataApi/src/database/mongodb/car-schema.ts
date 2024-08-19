import { Schema, model } from 'mongoose'
import { ICarModelSchema } from './car-model-schema';

interface ICarSchema {
    car_model_id: String,
    plate: String,
    km: Number,
    carModel: Schema.Types.ObjectId
}

const carSchema = new Schema<ICarSchema>({
    plate: {
        type: String,
        required: true
    },
    km: {
        type: Number,
        default: 0
    },
    carModel: { type: Schema.Types.ObjectId, ref: 'CarModel'}
});

const CarModel = model<ICarSchema>('Car', carSchema);

export default CarModel;