import { Schema, model } from 'mongoose'

interface IRentalSchema {
    customer_id: Schema.Types.ObjectId,
    car_id: Schema.Types.ObjectId,
    start_date: Date,
    end_date: Date,
    daily_value: Number
}

const rentalSchema = new Schema<IRentalSchema>({
    customer_id: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },  
    car_id: {
        type: Schema.Types.ObjectId,
        ref: 'Car',
        required: true
    },
    start_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date,
        required: true
    },
    daily_value: {
        type: Number,
        required: true
    }
});

const RentalModel = model<IRentalSchema>('Rental', rentalSchema);

export default RentalModel;