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

        this.server.get('/api-servico/carro-modelo', async (request, reply) => {
            await this.carModelController.findAll(request, reply);
        });
        
        this.server.get<{ Params: CarModelFindIdInputType }>('/api-servico/carro-modelo/:car_model_id', async (request, reply) => {
            await this.carModelController.findById(request, reply);
        })


    }
}

const CarModelCreateInput = Type.Object({
    name: Type.String(),
    brand: Type.String(),
    airbag: Type.Boolean(),
    abs: Type.Boolean()
});

const CarModelFindIdInput = Type.Object({
    car_model_id: Type.String()
});

type CarModelFindIdInputType = Static<typeof CarModelFindIdInput>;
type CarModelCreateInputType = Static<typeof CarModelCreateInput>;

export { CarModelRouter, CarModelCreateInputType, CarModelFindIdInputType };