import { FastifyReply, FastifyRequest } from "fastify";
import { CarModelCreateInputType } from "../routes/car-model-router";
import DataApi from "../stub/data-api";

class CarModelController {

    public async create(request: FastifyRequest<{ Body: CarModelCreateInputType }>, reply: FastifyReply) {
        let carModel: CarModelCreateInputType = {
            name: request.body.name,
            brand: request.body.brand,
            airbag: request.body.airbag,
            abs: request.body.abs
        }
        const inputError = this.validateData(carModel);
        if (inputError.length) {
            return reply.status(403).send({ error: inputError });
        }
        carModel = await DataApi.saveCarModel(carModel);
        if (!carModel) {
            return reply.status(500).send({ error: ['Internal Server Error'] });
        }
        return reply.status(201).send({ carModel })
    }

    public validateData(carModel: CarModelCreateInputType): String[] {
        const errorMessage: String[] = [];
        if (carModel.name.length < 3) {
            errorMessage.push('O nome do modelo do carro deve possuir mais que 3 caracteres.')
        }
        if (carModel.name.length < 3) {
            errorMessage.push('O nome da marca do carro deve possuir mais que 3 caracteres.');
        }
        return errorMessage;
    }

}

export default CarModelController;