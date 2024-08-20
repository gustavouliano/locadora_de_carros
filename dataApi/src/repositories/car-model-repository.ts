import { FastifyReply, FastifyRequest } from "fastify";
import { CarModelCreateInputType, CarModelFindIdType } from "../routes/car-model-router";
import ModelCarModel from "../database/mongodb/car-model-schema";

class CarModelRepository {

    public async save(request: FastifyRequest<{ Body: CarModelCreateInputType }>, reply: FastifyReply) {
        let carModel = new ModelCarModel({
            name: request.body.name,
            brand: request.body.brand,
            airbag: request.body.airbag,
            abs: request.body.abs
        });
        await carModel.save();
        return reply.status(201).send(carModel);
    }

    public async findById(request: FastifyRequest<{ Params: CarModelFindIdType }>, reply: FastifyReply){
        const { car_model_id } = request.params;
        const carModel = await ModelCarModel.findById(car_model_id);
        return reply.status(200).send(carModel);
    }

    public async findAll(request: FastifyRequest, reply: FastifyReply){
        const carModels = await ModelCarModel.find();
        return reply.status(200).send(carModels);
    }

}

export default CarModelRepository;