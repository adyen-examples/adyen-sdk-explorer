const { authRouter } = require('./auth');
const { userRouter, configurationRouter } = require('./users');
const { sessionsRouter, paymentsRouter } = require('./adyen-endpoints');

module.exports = {
  authRouter,
  userRouter,
  sessionsRouter,
  paymentsRouter,
  configurationRouter
};
