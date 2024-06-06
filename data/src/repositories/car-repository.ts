import { FastifyReply, FastifyRequest } from "fastify";
import { CarCreateInputType } from "../routes/car-router";
import CarModel from "../database/mongodb/car-schema";

class CarRepository {

    public async save(request: FastifyRequest<{ Body: CarCreateInputType }>, reply: FastifyReply) {
        let carModel = new CarModel({
            car_model_id: request.body.car_model_id,
            plate: request.body.plate,
            km: request.body.km,
        });
        await carModel.save();
        return reply.status(201).send(carModel);
    }

    // public async findById(request: FastifyRequest<{ Params: CarModelFindIdType }>, reply: FastifyReply){
    //     const { car_model_id } = request.params;
    //     const carModel = await ModelCarModel.findById(car_model_id);
    //     return reply.status(200).send(carModel);
    // }

}

export default CarRepository;