import { FastifyReply, FastifyRequest } from "fastify";
import CustomerModel from "../database/mongodb/customer-schema";
import { CustomerCreateInputType, CustomerModelFindIdType } from "../routes/customer-router";

class CustomerRepository {

    public async save(request: FastifyRequest<{ Body: CustomerCreateInputType }>, reply: FastifyReply) {
        let customerModel = new CustomerModel({

        });
        await customerModel.save();
        return reply.status(201).send(customerModel);
    }

    public async findById(request: FastifyRequest<{ Params: CustomerModelFindIdType }>, reply: FastifyReply){
        const { cliente_id } = request.params;
        const customerModel = await CustomerModel.findById(cliente_id);
        return reply.status(200).send(customerModel);
    }

}

export default CustomerRepository;