import { FastifyInstance } from "fastify";
import { Static, Type } from '@sinclair/typebox';
import CarController from "../controllers/car-controller";

class CarRouter {

    public constructor(
        private server: FastifyInstance,
        private carController: CarController
    ) { }

    public execute() {
        this.server.post<{ Body: CarCreateInputType }>('/api-servico/carro',
            {
                schema: {
                    body: CarCreateInput
                }
            },
            async (request, reply) => {
                await this.carController.create(request, reply);
            });
    }
}

const CarCreateInput = Type.Object({
    car_model_id: Type.String(),
    plate: Type.String(),
    km: Type.Number()
});

type CarCreateInputType = Static<typeof CarCreateInput>;

export { CarRouter, CarCreateInputType };