require("dotenv").config();
import fastify from 'fastify';
import cors from '@fastify/cors';
import { CarModelRouter } from './routes/car-model-router';
import CarModelController from './controllers/car-model-controller';
import CarController from './controllers/car-controller';
import { CarRouter } from './routes/car-router';
import CustomerController from './controllers/customer-controller';
import RentalController from './controllers/rental-controller';
import { CustomerRouter } from './routes/customer-router';
import { RentalRouter } from './routes/rental-router';

const server = fastify();
server.register(cors, {});

const carModelController = new CarModelController();
const carController = new CarController();
const customerController = new CustomerController();
const rentalController = new RentalController();

new CarModelRouter(server, carModelController).execute();
new CarRouter(server, carController).execute();
new CustomerRouter(server, customerController).execute();
new RentalRouter(server, rentalController).execute();

const port = process.env.API_PORT ? Number(process.env.API_PORT) : 8000;
server.listen({ port: port, host: '0.0.0.0' }, (err, address) => {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});