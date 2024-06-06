import { FastifyInstance } from "fastify";
import { Static, Type } from '@sinclair/typebox';
import CarModelController from "../controllers/car-model-controller";

class CarModelRouter {

    public constructor(
        private server: FastifyInstance,
        private carModelController: CarModelController
    ) { }

    public execute() {
        this.server.post<{ Body: CarModelCreateInputType }>('/api-servico/carro-modelo',
            {
                schema: {
                    body: CarModelCreateInput
                }
            },
            async (request, reply) => {
                await this.carModelController.create(request, reply);
            });
    }
}

const CarModelCreateInput = Type.Object({
    name: Type.String(),
    brand: Type.String(),
    airbag: Type.Boolean(),
    abs: Type.Boolean()
});

type CarModelCreateInputType = Static<typeof CarModelCreateInput>;

export { CarModelRouter, CarModelCreateInputType };