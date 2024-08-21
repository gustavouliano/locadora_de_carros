import { FastifyInstance } from "fastify";
import { Static, Type } from '@sinclair/typebox';
import RentalController from "../controllers/rental-controller";

class RentalRouter {

    public constructor(
        private server: FastifyInstance,
        private rentalController: RentalController
    ) { }

    public execute() {
        this.server.post<{ Body: RentalCreateInputType }>('/api-servico/locacao',
            {
                schema: {
                    body: RentalCreateInput
                }
            },
            async (request, reply) => {
                await this.rentalController.create(request, reply);
            }
        );

        this.server.get('/api-servico/locacao', async (request, reply) => {
            await this.rentalController.find(request, reply);
        })

        this.server.get<{ Params: RentalFindIdInputType }>('/api-servico/locacao/:rental_id', async (request, reply) => {
            await this.rentalController.findById(request, reply);
        })

        this.server.get('/api-servico/locacao/download', async (request, reply) => {
            await this.rentalController.generateFileInfo(request, reply);
        })
    }
}

const RentalCreateInput = Type.Object({
    customer_id: Type.String(),
    car_id: Type.String(),
    start_date: Type.String(),
    end_date: Type.String(),
    daily_value: Type.Number()
});

const RentalFindIdInput = Type.Object({
    rental_id: Type.String()
});

type RentalFindIdInputType = Static<typeof RentalFindIdInput>;
type RentalCreateInputType = Static<typeof RentalCreateInput>;

export { RentalRouter, RentalCreateInputType, RentalFindIdInputType };