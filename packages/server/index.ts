import cors from 'cors';
import path from 'path';
import express from 'express';

import cookieParser from 'cookie-parser';

import { PORT, CLIENT_ORIGIN } from './config';
import { productsRouter, sessionsRouter, paymentsRouter } from './routes';

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
  res.sendFile('index.html', { root });
});

app.use('/api/sessions', sessionsRouter);
app.use('/api/payments', paymentsRouter);
app.use('/api/products', productsRouter);

app.listen(PORT, () => {
  console.log('Your app is listening on port', PORT);
});
