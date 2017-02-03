import session from 'express-session';
import mongoose from 'mongoose';
import connectMongo from 'connect-mongo';
import chalk from 'chalk';

export const connectToMongoDB = (callback) => {
  const MongoStore = connectMongo(session);
  const databaseURI = process.env.MONGODB_URI || process.env.MONGOLAB_URI;
  mongoose.Promise = global.Promise;
  mongoose.connect(databaseURI);
  mongoose.connection.on('error', () => {
    console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
    process.exit();
  });
  mongoose.connection.on('connected', function () {
    console.log(`Mongoose connection open to ${databaseURI}`);
    if (callback) {
      callback();
    }
  });
};
