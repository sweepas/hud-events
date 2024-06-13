import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();
console.log('MONGODB_URI:bgfdgbg', process.env.MONGODB_URI);

const connection: { isConnected?: number } = {};

async function connectToDatabase() {
    if (connection.isConnected) {
        console.log("Using existing connection");
        return;
    }

    // Set a default value for MONGODB_URI if it's not defined
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
