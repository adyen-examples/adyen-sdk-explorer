import cors from 'cors';
import path from 'path';
import express from 'express';

import passport from 'passport';
import mongoose, { ConnectOptions } from 'mongoose';
import cookieParser from 'cookie-parser';

import { dbConnect, mongoOptions } from './db-mongoose';
import { PORT, DATABASE_URL, CLIENT_ORIGIN } from './config';
import { productsRouter, authRouter, userRouter, sessionsRouter, paymentsRouter, configurationRouter, localStrategy, jwtStrategy } from './routes';

export const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);

const root = path.join(__dirname, '../client', 'build');
app.use(express.static(root));
app.get('/checkout-builder', (req, res) => {
  res.sendFile('index.html', { root });
});
app.get('/:component', (req, res) => {
  //validate component against db or return 404
  res.sendFile('index.html', { root });
});

passport.use(localStrategy);
passport.use(jwtStrategy);

app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/payments', paymentsRouter);
app.use('/api/configurations', configurationRouter);
app.use('/api/products', productsRouter);

let server: any;

export const runServer = (databaseUrl = DATABASE_URL, port = PORT) => {
  return new Promise<void>((resolve, reject) => {
    mongoose.connect(databaseUrl, mongoOptions as ConnectOptions, err => {
      if (err) {
        return reject(err);
      }
      server = app
        .listen(port, () => {
          console.log(`Your app is listening on port ${port}`);
          resolve();
        })
        .on('error', err => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
};

export const closeServer = () => {
  return mongoose.disconnect().then(() => {
    return new Promise<void>((resolve, reject) => {
      console.log('Closing server');
      return server.close((err: any) => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
};

if (require.main === module) {
  dbConnect(DATABASE_URL);
  runServer();
}
