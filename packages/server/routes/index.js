const { authRouter, localStrategy, jwtStrategy } = require('./auth');
const { userRouter, configurationRouter } = require('./users');
const { sessionsRouter, paymentsRouter } = require('./adyen-endpoints');

module.exports = {
  authRouter,
  userRouter,
  jwtStrategy,
  localStrategy,
  sessionsRouter,
  paymentsRouter,
  configurationRouter
};
