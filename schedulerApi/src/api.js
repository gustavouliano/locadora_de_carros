require('dotenv').config();
const fastify = require('fastify');
const businessRouter = require('./routes/business-router');
const dataRouter = require('./routes/data-router');

const server = fastify();

businessRouter(server);
dataRouter(server);

const port = process.env.API_PORT ? Number(process.env.API_PORT) : 8020;
server.listen({ port : port, host: '0.0.0.0' }, (err, address) => {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});