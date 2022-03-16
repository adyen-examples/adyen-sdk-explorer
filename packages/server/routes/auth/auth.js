const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const config = require('../../config');

const router = express.Router();

const createAuthToken = user => {
  return jwt.sign({ user }, config.JWT_SECRET, {
    subject: user.username,
    expiresIn: config.JWT_EXPIRY,
    algorithm: 'HS256'
  });
};

const localAuth = passport.authenticate('local', { session: false });

router.post('/login', localAuth, (req, res) => {
  const authToken = createAuthToken(req.user.apiRepr());
  res.json({ authToken, userId: req.user.apiRepr().id });
});

const jwtAuth = passport.authenticate('jwt', { session: false });

router.post('/refresh', jwtAuth, (req, res) => {
  const authToken = createAuthToken(req.user);
  res.json({ authToken });
});

module.exports = { router, jwtAuth };
