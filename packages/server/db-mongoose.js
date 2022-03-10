const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const { DATABASE_URL } = require('./config');

const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

const dbConnect = (url = DATABASE_URL) => {
  return mongoose.connect(url, mongoOptions).catch(err => {
    console.error('Mongoose failed to connect');
    console.error(err);
  });
};

const dbDisconnect = () => {
  return mongoose.disconnect();
};

const dbGet = () => {
  return mongoose;
};

module.exports = {
  dbGet,
  dbConnect,
  dbDisconnect,
  mongoOptions
};
