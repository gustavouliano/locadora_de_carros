import { FastifyInstance } from "fastify";
import { Static, Type } from '@sinclair/typebox';
import CarModelRepository from "../repositories/car-model-repository";

class CarRouter {

    public constructor(
        private server: FastifyInstance,
        private carModelRepository: CarModelRepository
    ) { }

    public execute() {
        this.server.post<{ Body: CarCreateInputType }>('/api-data/carro',
            {
                schema: {
                    body: CarCreateInput
                }
            },
            async (request, reply) => {
                await this.carRepository.save(request, reply);
            });

        this.server.get('/api-data/carro', async (request, reply) => {

        })

    }
}

const CarCreateInput = Type.Object({
    car_model_id: Type.String(),
    plate: Type.String(),
    km: Type.Number()
});

type CarCreateInputType = Static<typeof CarCreateInput>;

export { CarRouter, CarCreateInputType };