const { router: sessionsRouter } = require('./sessions');
const { router: paymentsRouter } = require('./payments');

module.exports = {
  sessionsRouter,
  paymentsRouter
};
