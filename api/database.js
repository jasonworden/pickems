import session from 'express-session';
import mongoose from 'mongoose';
import connectMongo from 'connect-mongo';

export const connectToMongoDB = () => {
  const MongoStore = connectMongo(session);
  mongoose.Promise = global.Promise;
  mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI);
  mongoose.connection.on('error', () => {
    console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
    process.exit();
  });
};
