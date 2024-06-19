import mongoose from 'mongoose';
import dotenv from 'dotenv';
import './models/category.models';
import '../db/models/events.models';
import '../db/models/users.model'


dotenv.config();
console.log('MONGODB_URI:bgfdgbg', process.env.MONGODB_URI);

const connection: { isConnected?: number } = {};

async function connectToDatabase() {
    if (connection.isConnected) {
        return;
    }


    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/yourLocalDatabaseName';

    try {
        const db = await mongoose.connect(mongoUri);

        connection.isConnected = db.connections[0].readyState;
        console.log("New database connection established, ready state:", connection.isConnected);
    } catch (error) {
        console.error("Error connecting to database:", error);
        throw new Error("Database connection failed");
    }
}

export default connectToDatabase;
