const jwt_decode = require('jwt-decode');

const isAuthorizedForAction = (req, res, next) => {
  const userToken = req.headers.authorization.split(' ')[1];
  const { userId } = req.params;
  const tokenData = jwt_decode(userToken);
  return tokenData.user.id === userId
    ? next()
    : res.status(401).json({
        code: 401,
        reason: 'Not authorized'
      });
};

module.exports = { isAuthorizedForAction };
