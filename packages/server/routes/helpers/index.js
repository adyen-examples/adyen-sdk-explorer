// TODO: Decide if we want to log to an external source. Would take up too much DB room for a free version in the meantime
const { runUserValidation } = require('./users');

const errorHandler = (endpoint, statusCode, message, res) => {
  console.error('ERROR:', endpoint, message);
  res.send(statusCode).json({ message });
};

module.exports = {
  errorHandler,
  runUserValidation
};
