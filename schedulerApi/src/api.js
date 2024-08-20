const fastify = require('fastify');
require('dotenv').config();
const businessRouter = require('./routes/business-router');

const server = fastify();

businessRouter(server);

server.listen({ port : 8020, host: '0.0.0.0' }, (err, address) => {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});