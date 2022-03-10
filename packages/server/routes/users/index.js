const { router: userRouter } = require('./users');
const { router: configurationRouter } = require('./configurations');

module.exports = {
  userRouter,
  configurationRouter
};
