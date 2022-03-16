require('dotenv').config();
const path = require('path');
const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const { dbConnect, mongoOptions } = require('./db-mongoose');
const { PORT, DATABASE_URL } = require('./config');
const { authRouter, userRouter, sessionsRouter, paymentsRouter, configurationRouter, localStrategy, jwtStrategy } = require('./routes');

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

const root = path.join(__dirname, '../client', 'build');
app.use(express.static(root));
app.get('*', (req, res) => {
  res.sendFile('index.html', { root });
});

passport.use(localStrategy);
passport.use(jwtStrategy);

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/sessions', sessionsRouter);
app.use('/payments', paymentsRouter);
app.use('/configurations', configurationRouter);

let server;

const runServer = (databaseUrl = DATABASE_URL, port = PORT) => {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, mongoOptions, err => {
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

const closeServer = () => {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
};

if (require.main === module) {
  dbConnect();
  runServer();
}

module.exports = { app, runServer, closeServer };
