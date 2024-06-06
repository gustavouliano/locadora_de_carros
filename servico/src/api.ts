import fastify from 'fastify';
import { CarModelRouter } from './routes/car-model-router';
import CarModelController from './controllers/car-model-controller';
import CarController from './controllers/car-controller';
import { CarRouter } from './routes/car-router';

const server = fastify();

const carModelController = new CarModelController();
const carController = new CarController();

new CarModelRouter(server, carModelController).execute();
new CarRouter(server, carController).execute();

server.listen({ port : 8000 }, (err, address) => {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});