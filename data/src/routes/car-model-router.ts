import { FastifyInstance } from "fastify";
import { Static, Type } from '@sinclair/typebox';
import CarModelRepository from "../repositories/car-model-repository";

class CarModelRouter {

    public constructor(
        private server: FastifyInstance,
        private carModelRepository: CarModelRepository
    ) { }

    public execute() {
        this.server.post<{ Body: CarModelCreateInputType }>('/api-data/carro-modelo',
            {
                schema: {
                    body: CarModelCreateInput
                }
            },
            async (request, reply) => {
                await this.carModelRepository.save(request, reply);
            });

        this.server.get<{ Params: CarModelFindIdType }>('/api-data/carro-modelo/:car_model_id', async (request, reply) => {
            await this.carModelRepository.findById(request, reply);
        })
    }
}

const CarModelCreateInput = Type.Object({
    name: Type.String(),
    brand: Type.String(),
    airbag: Type.Boolean(),
    abs: Type.Boolean()
});

const CarModelFindId = Type.Object({
    car_model_id: Type.String()
});

type CarModelFindIdType = Static<typeof CarModelFindId>;

type CarModelCreateInputType = Static<typeof CarModelCreateInput>;

export { CarModelRouter, CarModelCreateInputType, CarModelFindIdType };