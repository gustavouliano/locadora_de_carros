const dataRouter = (server) => {

    const addresses = [process.env.DATA_API_PORT_1, process.env.DATA_API_PORT_2, process.env.DATA_API_PORT_3];
    server.get('/api-scheduler/data', async (req, reply) => {

        const address = addresses.shift();
        addresses.push(address);
        
        reply.status(200).send({ address });
    });
}

module.exports = dataRouter;