const { isAuthorizedForAction } = require('./middleware');
const { localStrategy, jwtStrategy } = require('./strategies');
const { router: authRouter, jwtAuth } = require('./auth');

module.exports = {
  jwtAuth,
  authRouter,
  jwtStrategy,
  localStrategy,
  isAuthorizedForAction
};
