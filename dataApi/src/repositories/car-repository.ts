import { FastifyReply, FastifyRequest } from "fastify";
import { CarCreateInputType, CarFindIdInputType } from "../routes/car-router";
import CarModel from "../database/mongodb/car-schema";

class CarRepository {

    public async save(request: FastifyRequest<{ Body: CarCreateInputType }>, reply: FastifyReply) {
        let carModel = new CarModel({
            carModel: request.body.carModel,
            plate: request.body.plate,
            km: request.body.km,
        });
        await carModel.save();
        return reply.status(201).send(carModel);
    }

    public async findById(request: FastifyRequest<{ Params: CarFindIdInputType }>, reply: FastifyReply){
        const { car_id } = request.params;
        const carModel = await CarModel.findById(car_id);
        return reply.status(200).send(carModel);
    }

    public async findAll(request: FastifyRequest, reply: FastifyReply) {
        const cars = await CarModel.find().populate('carModel', 'name');
        return reply.status(200).send(cars);
    }

}

export default CarRepository;