import { FastifyReply, FastifyRequest } from "fastify";
import RentalModel from "../database/mongodb/rental-schema";
import { RentalCreateInputType, RentalFindIdInputType } from "../routes/rental-router";

class RentalRepository {

    public async save(request: FastifyRequest<{ Body: RentalCreateInputType }>, reply: FastifyReply) {
        let rentalModel = new RentalModel({
            car_id: request.body.car_id,
            customer_id: request.body.customer_id,
            start_date: request.body.start_date,
            end_date: request.body.end_date,
            daily_value: request.body.daily_value
        });
        await rentalModel.save();
        return reply.status(201).send(rentalModel);
    }

    public async findById(request: FastifyRequest<{ Params: RentalFindIdInputType }>, reply: FastifyReply){
        const { rental_id } = request.params;
        const rentalModel = await RentalModel.findById(rental_id);
        return reply.status(200).send(rentalModel);
    }

    public async findAll(request: FastifyRequest, reply: FastifyReply) {
        const rentalModels = await RentalModel.find();
        return reply.status(200).send(rentalModels);
    }

}

export default RentalRepository;