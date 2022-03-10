const { router: authRouter, jwtAuth } = require('./auth');
const { localStrategy, jwtStrategy } = require('./strategies');

module.exports = {
  jwtAuth,
  authRouter,
  jwtStrategy,
  localStrategy
};
