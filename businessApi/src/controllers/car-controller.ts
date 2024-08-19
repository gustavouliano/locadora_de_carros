import { FastifyReply, FastifyRequest } from "fastify";
import { CarCreateInputType, CarFindIdInputType } from "../routes/car-router";
import DataApi from "../stub/data-api";

class CarController {

    public async create(request: FastifyRequest<{ Body: CarCreateInputType }>, reply: FastifyReply) {
        let car = {
            carModel: request.body.carModel,
            plate: request.body.plate,
            km: request.body.km
        }
        const inputError = await this.validateData(car);
        if (inputError.length) {
            return reply.status(403).send({ error: inputError });
        }
        car = await DataApi.saveCar(car);
        if (!car) {
            return reply.status(500).send({ error: ['Internal Server Error'] });
        }
        return reply.status(201).send({ car })
    }

    public async findById(request: FastifyRequest<{ Params: CarFindIdInputType }>, reply: FastifyReply) {
        const { car_id } = request.params;
        const car = await DataApi.findCarById(car_id);
        if (!car){
            return reply.status(404).send({ error: ['Modelo de carro não encontrado.']});
        }
        return reply.status(200).send({ car })
    }

    public async findAll(request: FastifyRequest, reply: FastifyReply){
        const cars = await DataApi.findCar();
        return reply.status(200).send({ cars })
    }

    public async validateData(car: CarCreateInputType): Promise<String[]> {
        const errorMessage: String[] = [];
        const carModel = await DataApi.findCarModelById(car.carModel);
        if (!carModel) {
            errorMessage.push('O modelo do carro não existe.');
        }
        if (car.km < 0) {
            errorMessage.push('A quilometragem do carro deve ser maior ou igual a zero.')
        }
        return errorMessage;
    }

}

export default CarController;