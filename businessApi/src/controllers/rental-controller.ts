import { FastifyReply, FastifyRequest } from "fastify";
import { RentalCreateInputType, RentalFindIdInputType } from "../routes/rental-router";
import DataApiRequests from "../stub/data-api-requests";
import fs from 'fs';
import path from 'path';

class RentalController {

    public async create(request: FastifyRequest<{ Body: RentalCreateInputType }>, reply: FastifyReply) {
        let rental = {
            customer_id: request.body.customer_id,
            car_id: request.body.car_id,
            start_date: request.body.start_date,
            end_date: request.body.end_date,
            daily_value: request.body.daily_value
        };
        const customerExists = await DataApiRequests.findCustomerById(rental.customer_id);
        if (!customerExists) {
            return reply.status(404).send({ error: ['Cliente não existe'] });
        }
        const car = await DataApiRequests.findCarById(rental.car_id);
        if (!car) {
            return reply.status(404).send({ error: ['Carro não existe'] });
        }
        rental = await DataApiRequests.saveRental(rental);
        if (!rental) {
            return reply.status(500).send({ error: ['Internal Server Error'] });
        }
        return reply.status(201).send(rental);
    }

    public async find(request: FastifyRequest, reply: FastifyReply) {
        const rentals = await DataApiRequests.findRentals();
        if (!rentals) {
            return reply.status(404).send({ error: ['Não há locações'] });
        }
        return reply.status(200).send({ rentals });
    }

    public async findById(request: FastifyRequest<{ Params: RentalFindIdInputType }>, reply: FastifyReply) {
        const rentalId = request.params.rental_id;
        const rental = await DataApiRequests.findRentalById(rentalId);
        if (!rental) {
            return reply.status(404).send({ error: ['Locação não existe'] });
        }
        return reply.status(200).send({ rental });
    }

    public async generateFileInfo(request: FastifyRequest, reply: FastifyReply) {
        let fileContent = '';
        const rentals = await DataApiRequests.findRentals();
        let sum = 0;
        rentals.forEach((rental: any) => {
            const startDate = new Date(rental.start_date.split('T')[0].replace(/-/g, '/'));
            const endDate = new Date(rental.end_date.split('T')[0].replace(/-/g, '/'));;
            const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
            const totalRental = rental.daily_value * diffDays;
            sum += totalRental;
            fileContent += `ID: ${rental._id} | Aluguel diário: R$ ${rental.daily_value} | Data ínicio: ${startDate.toDateString()} | Data fim: ${endDate.toDateString()} | Total: R$ ${totalRental}\n`;
        });
        fileContent += `Soma total dos aluguéis: R$ ${sum}`;
        const tempFilePath = path.join(__dirname, '..', '..', 'temp', 'infoRentals.txt');
        fs.writeFileSync(tempFilePath, fileContent);
        reply.type('text/plain').header('Content-Disposition', 'attachment; filename="alugueis.txt"');

        const bufferFile = fs.readFileSync(tempFilePath);
        reply.send(bufferFile);
    }

    public async validateData(car: RentalCreateInputType): Promise<String[]> {
        const errorMessage: String[] = [];

        return errorMessage;
    }
}

export default RentalController;