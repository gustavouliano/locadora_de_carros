import { FastifyInstance } from "fastify";
import { Static, Type } from '@sinclair/typebox';
import RentalRepository from "../repositories/rental-repository";

class RentalRouter {

    public constructor(
        private server: FastifyInstance,
        private rentalRepository: RentalRepository
    ) { }

    public execute() {
        this.server.post<{ Body: RentalCreateInputType }>('/api-data/locacao',
            {
                schema: {
                    body: RentalCreateInput
                }
            },
            async (request, reply) => {
                await this.rentalRepository.save(request, reply);
            }
        );

        this.server.get('/api-data/locacao', async (request, reply) => {
            await this.rentalRepository.findAll(request, reply);
        });

        this.server.get<{ Params: RentalFindIdInputType }>('/api-data/locacao/:rental_id', async (request, reply) => {
            await this.rentalRepository.findById(request, reply);
        })

    }
}

const RentalCreateInput = Type.Object({
    customer: Type.String(),
    car: Type.String(),
    start_date: Type.String(),
    end_date: Type.String(),
    daily_value: Type.Number()
});

const RentalFindIdInput = Type.Object({
    rental_id: Type.String()
});

type RentalFindIdInputType = Static<typeof RentalFindIdInput>;

type RentalCreateInputType = Static<typeof RentalCreateInput>;

export { RentalRouter, RentalCreateInputType, RentalFindIdInputType  };