import { FastifyInstance } from "fastify";
import { Static, Type } from '@sinclair/typebox';
import CustomerRepository from "../repositories/customer-repository";


class CustomerRouter {

    public constructor(
        private server: FastifyInstance,
        private customerRepository: CustomerRepository
    ) { }

    public execute() {
        this.server.post<{ Body: CustomerCreateInputType }>('/api-data/cliente',
            {
                schema: {
                    body: CustomerCreateInput
                }
            },
            async (request, reply) => {
                await this.customerRepository.save(request, reply);
            }
        );

        this.server.get('/api-data/cliente', async (request, reply) => {
            await this.customerRepository.findAll(request, reply);
        })

        this.server.get<{ Params: CustomerFindIdInputType }>('/api-data/cliente/:cliente_id', async(request, reply) => {
            await this.customerRepository.findById(request, reply);
        });

    }
}

const CustomerCreateInput = Type.Object({
    name: Type.String()
});

const CustomerFindIdInput = Type.Object({
    cliente_id: Type.String()
});

type CustomerFindIdInputType = Static<typeof CustomerFindIdInput>;

type CustomerCreateInputType = Static<typeof CustomerCreateInput>;

export { CustomerRouter, CustomerCreateInputType, CustomerFindIdInputType };