import { FastifyReply, FastifyRequest } from "fastify";
import { CustomerCreateInputType, CustomerFindIdType } from "../routes/customer-router";
import DataApi from "../stub/data-api";

class CustomerController {

    public async create(request: FastifyRequest<{ Body: CustomerCreateInputType }>, reply: FastifyReply) {
        let customer = {
            name: request.body.name,
        }
        const inputError = await this.validateData(customer);
        if (inputError.length) {
            return reply.status(403).send({ error: inputError });
        }
        customer = await DataApi.saveCustomer(customer);
        if (!customer) {
            return reply.status(500).send({ error: ['Internal Server Error'] });
        }
        return reply.status(201).send({ customer })
    }

    public async find(request: FastifyRequest, reply: FastifyReply) {
        const customers = await DataApi.findCustomers();
        if (!customers){
            return reply.status(404).send({ error: ['Não há clientes'] });
        }
        return reply.status(200).send({customers});
    }

    public async findById(request: FastifyRequest<{ Params: CustomerFindIdType }>, reply: FastifyReply) {
        let id = request.params.customer_id;
        const customer = await DataApi.findCustomerById(id);
        if (!customer){
            return reply.status(404).send({error: ['Cliente não existe']});
        }
        return reply.status(200).send({customer});
    }

    public async validateData(car: CustomerCreateInputType): Promise<String[]> {
        const errorMessage: String[] = [];
        if (car.name.length < 3) {
            errorMessage.push('O nome deve possuir no mínimo 3 caracteres.')
        }
        return errorMessage;
    }
}

export default CustomerController;