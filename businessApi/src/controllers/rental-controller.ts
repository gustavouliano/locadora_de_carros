import { FastifyReply, FastifyRequest } from "fastify";
import DataApi from "../stub/data-api";
import { RentalCreateInputType, RentalFindIdInputType } from "../routes/rental-router";

class RentalController {

    public async create(request: FastifyRequest<{ Body: RentalCreateInputType }>, reply: FastifyReply) {
        let rental = {
            customer_id: request.body.customer_id,
            car_id: request.body.car_id,
            start_date: request.body.start_date,
            end_date: request.body.end_date,
            daily_value: request.body.daily_value
        };
        const customerExists = await DataApi.findCustomerById(rental.customer_id);
        if (!customerExists) {
            return reply.status(404).send({ error: ['Cliente não existe'] });
        }
        const car = await DataApi.findCarById(rental.car_id);
        if (!car) {
            return reply.status(404).send({ error: ['Carro não existe'] });
        }
        rental = await DataApi.saveRental(rental);
        if (!rental) {
            return reply.status(500).send({ error: ['Internal Server Error'] });
        }
        return reply.status(201).send(rental);
    }

    public async find(request: FastifyRequest, reply: FastifyReply) {
        const rentals = await DataApi.findRentals();
        if (!rentals){
            return reply.status(404).send({ error: ['Não há locações'] });
        }
        return reply.status(200).send({rentals});
    }

    public async findById(request: FastifyRequest<{ Params: RentalFindIdInputType }>, reply: FastifyReply) {
        const rentalId = request.params.rental_id;
        const rental = await DataApi.findRentalById(rentalId);
        if (!rental){
            return reply.status(404).send({ error: ['Locação não existe']});
        }
        return reply.status(200).send({rental});
    }

    public async validateData(car: RentalCreateInputType): Promise<String[]> {
        const errorMessage: String[] = [];

        return errorMessage;
    }
}

export default RentalController;