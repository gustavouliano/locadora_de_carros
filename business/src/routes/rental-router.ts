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

        this.server.get('/api-servico/locacao/', async (request, reply) => {
            await this.rentalController.find(request, reply);
        })

        // this.server.get('/api-servico/locacao/:rental_id', async (request, reply) => {
        //     await this.rentalController.findById(request, reply);
        // })
    }
}

const RentalCreateInput = Type.Object({
    customer_id: Type.String(),
    car_id: Type.String(),
    start_date: Type.Date(),
    end_date: Type.Date(),
    daily_value: Type.Number()
});

// const RentalFindId = Type.Object({
//     customer_id: Type.String()
// });

// type CustomerFindIdType = Static<typeof CustomerFindId>;
type RentalCreateInputType = Static<typeof RentalCreateInput>;

export { RentalRouter, RentalCreateInputType };