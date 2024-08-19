
import fastify from 'fastify';
import CarModelRepository from './repositories/car-model-repository';
import { CarModelRouter } from './routes/car-model-router';
import { createMongooseConnection } from './database/mongodb/connection';
import CarRepository from './repositories/car-repository';
import { CarRouter } from './routes/car-router';
import CustomerRepository from './repositories/customer-repository';
import RentalRepository from './repositories/rental-repository';
import { CustomerRouter } from './routes/customer-router';
import { RentalRouter } from './routes/rental-router';

const server = fastify();

const carModelRepository = new CarModelRepository();
const carRepository = new CarRepository();
const customerRepository = new CustomerRepository();
const rentalRepository = new RentalRepository();

new CarModelRouter(server, carModelRepository).execute();
new CarRouter(server, carRepository).execute();
new CustomerRouter(server, customerRepository).execute();
new RentalRouter(server, rentalRepository).execute();




(function () {
    createMongooseConnection()
        .then(async() => {
            console.log('Conexão com MongoDB estabelecida.')
            initServer();
        })
        .catch(err => {
            console.log(err);
            console.log('Erro ao conectar-se ao mongodb.')
        });
})();
    
// initServer();

function initServer(){
    server.listen({ port: 8010 }, (err, address) => {
        if (err) {
            console.log(err);
            process.exit(1);
        }
        console.log(`Server listening at ${address}`);
    });
}

