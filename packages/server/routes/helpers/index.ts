export { runUserValidation } from './users';

// TODO: Decide if we want to log to an external source. Would take up too much DB room for a free version in the meantime
export const errorHandler = (endpoint, statusCode, message, res) => {
  console.error('ERROR:', endpoint, message);
  res.send(statusCode).json({ message });
};
