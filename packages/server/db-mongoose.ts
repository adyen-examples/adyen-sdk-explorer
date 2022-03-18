import mongoose, { ConnectOptions } from 'mongoose';

mongoose.Promise = global.Promise;

export const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

export const dbConnect = url => {
  return mongoose.connect(url, mongoOptions as ConnectOptions).catch(err => {
    console.error('Mongoose failed to connect');
    console.error(err);
  });
};

export const dbDisconnect = () => {
  return mongoose.disconnect();
};

export const dbGet = () => {
  return mongoose;
};
