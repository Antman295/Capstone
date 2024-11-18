import mongoose from 'mongoose'
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.mongoURI;

async function connectDB() {
try {
    await mongoose.connect(connectionString);

    console.log('Connected to MongoDB')
} catch (err) {
    console.error(err)
    process.exit(1);
}
}


export default connectDB;
