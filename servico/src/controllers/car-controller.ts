
import { FastifyReply, FastifyRequest } from "fastify";
import { CarCreateInputType } from "../routes/car-router";
import DataApi from "../stub/data-api";

class CarController {

    public async create(request: FastifyRequest<{ Body: CarCreateInputType }>, reply: FastifyReply) {
        let car = {
            car_model_id: request.body.car_model_id,
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

    public async validateData(car: CarCreateInputType): Promise<String[]> {
        const errorMessage: String[] = [];
        const carModel = await DataApi.findCarModelById(car.car_model_id);
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