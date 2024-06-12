import { FastifyInstance } from "fastify";
import { Static, Type } from '@sinclair/typebox';
import CustomerController from "../controllers/customer-controller";

class CustomerRouter {

    public constructor(
        private server: FastifyInstance,
        private customerController: CustomerController
    ) { }

    public execute() {
        this.server.post<{ Body: CustomerCreateInputType }>('/api-servico/cliente',
            {
                schema: {
                    body: CustomerCreateInput
                }
            },
            async (request, reply) => {
                await this.customerController.create(request, reply);
            }
        );
        this.server.get('/api-servico/cliente/', async (request, reply) => {
            await this.customerController.find(request, reply);
        })

        this.server.get<{ Params: CustomerFindIdType }>('/api-servico/cliente/:customer_id', async (request, reply) => {
            await this.customerController.findById(request, reply);
        })

    }
}

const CustomerCreateInput = Type.Object({
    name: Type.String(),
});

const CustomerFindId = Type.Object({
    customer_id: Type.String()
});

type CustomerFindIdType = Static<typeof CustomerFindId>;
type CustomerCreateInputType = Static<typeof CustomerCreateInput>;

export { CustomerRouter, CustomerCreateInputType, CustomerFindIdType };