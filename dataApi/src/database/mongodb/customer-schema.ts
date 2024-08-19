import { Schema, model } from 'mongoose'

interface ICustomerSchema {
    name: String,
}

const customerSchema = new Schema<ICustomerSchema>({
    name: {
        type: String,
        required: true
    }
});

const CustomerModel = model<ICustomerSchema>('Customer', customerSchema);

export default CustomerModel;