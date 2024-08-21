import { FastifyInstance } from "fastify";
import { Static, Type } from '@sinclair/typebox';
import CarModelRepository from "../repositories/car-model-repository";
import CarRepository from "../repositories/car-repository";

class CarRouter {

    public constructor(
        private server: FastifyInstance,
        private carRepository: CarRepository
    ) { }

    public execute() {
        this.server.post<{ Body: CarCreateInputType }>('/api-data/carro',
            {
                schema: {
                    body: CarCreateInput
                }
            },
            async (request, reply) => {
                console.log(request.body);  
                await this.carRepository.save(request, reply);
            }
        );

        this.server.get('/api-data/carro', async (request, reply) => {
            await this.carRepository.findAll(request, reply);
        });

        this.server.get<{ Params: CarFindIdInputType }>('/api-data/carro/:car_id', async (request, reply) => {
            await this.carRepository.findById(request, reply);
        })

    }
}

const CarCreateInput = Type.Object({
    carModel: Type.String(),
    plate: Type.String(),
    km: Type.Number()
});

const CarFindIdInput = Type.Object({
    car_id: Type.String()
});

type CarFindIdInputType = Static<typeof CarFindIdInput>;
type CarCreateInputType = Static<typeof CarCreateInput>;

export { CarRouter, CarCreateInputType, CarFindIdInputType };