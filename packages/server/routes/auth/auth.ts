import jwt from 'jsonwebtoken';
import passport from 'passport';
import express, { Request, Response } from 'express';
import { JWT_EXPIRY, JWT_SECRET } from '../../config';

const router = express.Router();

const createAuthToken = (user: any): string => {
  return jwt.sign({ user }, JWT_SECRET, {
    subject: user.username,
    expiresIn: JWT_EXPIRY,
    algorithm: 'HS256'
  });
};

const localAuth = passport.authenticate('local', { session: false });

router.post('/login', localAuth, (req: Request, res: Response) => {
  const authToken = createAuthToken(req.user);
  res.json({ authToken });
});

const jwtAuth = passport.authenticate('jwt', { session: false });

router.post('/refresh', jwtAuth, (req: Request, res: Response) => {
  const authToken = createAuthToken(req.user);
  res.json({ authToken });
});

export { router, jwtAuth };
