import { Request, Response, Router } from 'express';
import { Client, CheckoutAPI } from '@adyen/api-library';
import { ADYEN_API_KEY, ADYEN_MERCHANT_ACCOUNT } from '../../config';

import type { InitializationRequest, RequestOptions } from './types';

const client = new Client({ apiKey: ADYEN_API_KEY, environment: 'TEST' });

const checkoutApi = new CheckoutAPI(client);

const router = Router();

router.post('/sessionStart', async (req: Request, res: Response) => {
  const { payload }: InitializationRequest = req.body;

  try {
    const response = await checkoutApi.sessions(payload);
    res.json(response);
  } catch (err: any) {
    const { error } = err;
    res.status(err.statusCode).json({ error: error });
  }
});

router.post('/getPaymentMethods', async (req: Request, res: Response) => {
  const { payload }: InitializationRequest = req.body;
  try {
    const response = await checkoutApi.paymentMethods(payload);
    res.send(201).json(response);
  } catch (err: any) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/makePayment', async (req: Request, res: Response) => {
  const { payload } = req.body;
  try {
    const response = await checkoutApi.payments(payload);
    res.send(201).json(response);
  } catch (err: any) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/additionalDetails', async (req: Request, res: Response) => {
  const { payload } = req.body;
  try {
    const response = await checkoutApi.paymentsDetails(payload);
    res.send(201).json(response);
  } catch (err: any) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
