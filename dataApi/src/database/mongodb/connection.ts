
import mongoose from "mongoose";

async function createMongooseConnection() {
    const uri = "mongodb://127.0.0.1:27017";
    await mongoose.connect(uri, { replicaSet: 'rs0', directConnection: true})
}

export { createMongooseConnection }
