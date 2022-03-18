import jwt from 'jsonwebtoken';
import express from 'express';
import passport from 'passport';
import { JWT_EXPIRY, JWT_SECRET } from '../../config';

const router = express.Router();

const createAuthToken = (user: any): object => {
  return jwt.sign({ user }, JWT_SECRET, {
    subject: user.username,
    expiresIn: JWT_EXPIRY,
    algorithm: 'HS256'
  });
};

const localAuth = passport.authenticate('local', { session: false });

router.post('/login', localAuth, (req, res) => {
  const authToken = createAuthToken(req.user);
  res.json({ authToken });
});

const jwtAuth = passport.authenticate('jwt', { session: false });

router.post('/refresh', jwtAuth, (req, res) => {
  const authToken = createAuthToken(req.user);
  res.json({ authToken });
});

export { router, jwtAuth };
