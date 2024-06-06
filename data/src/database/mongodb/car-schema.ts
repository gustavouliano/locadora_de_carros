import { Schema, model } from 'mongoose'

interface ICarSchema {
    car_model_id: String,
    plate: String,
    km: Number
}

const carSchema = new Schema<ICarSchema>({
    car_model_id: {
        type: String,
        required: true,
    },
    plate: {
        type: String,
        required: true
    },
    km: {
        type: Number,
        default: 0
    }
});

const CarModel = model<ICarSchema>('Car', carSchema);

export default CarModel;