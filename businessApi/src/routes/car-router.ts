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
            
        this.server.get<{ Params: CarFindIdInputType }>('/api-servico/carro/:car_model_id', async (request, reply) => {
            await this.carController.findById(request, reply);
        })

        this.server.get('/api-servico/carro', async (request, reply) => {
            await this.carController.findAll(request, reply);
        });
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