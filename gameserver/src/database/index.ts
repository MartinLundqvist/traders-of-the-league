import 'dotenv/config';
import mongoose from 'mongoose';

const ENV = process.env.NODE_ENV;

const DB_STRING =
  ENV === 'production' ? process.env.DB_STRING : process.env.DB_STRING_LOCAL;

const connectToDB = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log('Mongoose connection alive.');
      return;
    }

    await mongoose.connect(DB_STRING || '');
    console.log('Connected to mongodb');
  } catch (err) {
    throw new Error(JSON.stringify(err));
  }
};

const closeDBConnection = async () => {
  try {
    await mongoose.connection.close();
    console.log('Mongoose connection closed');
  } catch (err) {
    console.log('Error closing mongoose connection');
  }
};

export { connectToDB, closeDBConnection };
