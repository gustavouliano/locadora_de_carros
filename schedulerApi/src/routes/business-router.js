const businessRouter = (server) => {

    const addresses = [process.env.BUSINESS_API_PORT_1, process.env.BUSINESS_API_PORT_2, process.env.BUSINESS_API_PORT_3];
    server.get('/api-scheduler/business', async (req, reply) => {

        const address = addresses.shift();
        addresses.push(address);
        
        reply.status(200).send({ address });
    });
}

module.exports = businessRouter;