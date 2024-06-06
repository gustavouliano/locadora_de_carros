
import fastify from 'fastify';
import CarModelRepository from './repositories/car-model-repository';
import { CarModelRouter } from './routes/car-model-router';
import { createMongooseConnection } from './database/mongodb/connection';

const server = fastify();

const carModelRepository = new CarModelRepository();

new CarModelRouter(server, carModelRepository).execute();



(function () {
    createMongooseConnection()
        .then(async() => {
            console.log('Conexão com MongoDB estabelecida.')
            initServer();
            // const carModel = new CarModel({
            //     id: "123653161",
            //     name: "testename",
            //     brand: "testebrand",
            //     airbag: false,
            //     abs: true,
            // });
            // carModel.save();

            // const a = await ModelCarModel.find();
            // console.log(a);
        })
        .catch(err => {
            console.log(err);
            console.log('Erro ao conectar-se ao mongodb.')
        });
})();

function initServer(){
    server.listen({ port: 8010 }, (err, address) => {
        if (err) {
            console.log(err);
            process.exit(1);
        }
    
        console.log(`Server listening at ${address}`);
    });
}

