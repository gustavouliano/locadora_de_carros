
import mongoose from "mongoose";

async function createMongooseConnection() {
    const url = 'mongodb://localhost:27017/crud-node-mongo-docker';
    await mongoose.connect(url);
}

export { createMongooseConnection }
