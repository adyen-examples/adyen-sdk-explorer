import { Request, Response, Router } from 'express';
import { Client, CheckoutAPI } from '@adyen/api-library';
import { ADYEN_API_KEY, ADYEN_MERCHANT_ACCOUNT } from '../../config';
import { getPaymentMethodIds, combinePaymentMethodDetails } from './helpers';
import { checkoutProps, paymentMethodProps, sessionsProps } from '../../models';

import type { InitializationRequest, PaymentMethodProps, PaymentMethodPropsList } from './types';

const client = new Client({ apiKey: ADYEN_API_KEY, environment: 'TEST' });

const checkoutApi = new CheckoutAPI(client);

const router = Router();

router.get('/paymentMethods', async (req: Request, res: Response) => {
  try {
    const { paymentMethods } = await checkoutApi.paymentMethods({ merchantAccount: ADYEN_MERCHANT_ACCOUNT });
    const paymentMethodIds = await getPaymentMethodIds();

    let products: { [key: string]: any } = { message: 'No Payment Methods available' };
    if (paymentMethods && paymentMethodIds) {
      products = combinePaymentMethodDetails(paymentMethods, paymentMethodIds);
    }

    return res.status(201).json(products);
  } catch (err: any) {
    res.status(err.statusCode).json({ error: err.message });
  }
});

router.get('/paymentMethods/:txvariant', (req, res) => {
  try {
    const local: PaymentMethodPropsList = paymentMethodProps;
    const componentConfig: PaymentMethodProps[] = local[req.params.txvariant];

    return res.status(201).json({ checkoutConfig: checkoutProps, localConfig: componentConfig, sessionsConfig: sessionsProps });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/makePayment', async (req: Request, res: Response) => {
  const { payload } = req.body;
  try {
    const response = await checkoutApi.payments(payload);
    res.send(201).json(response);
  } catch (err: any) {
    res.status(err.statusCode).json({ error: err.message });
  }
});

router.post('/additionalDetails', async (req: Request, res: Response) => {
  const { payload } = req.body;
  try {
    const response = await checkoutApi.paymentsDetails(payload);
    res.send(201).json(response);
  } catch (err: any) {
    res.status(err.statusCode).json({ error: err.message });
  }
});

router.post('/sessionStart', async (req: Request, res: Response) => {
  const payload: InitializationRequest = req.body;

  try {
    const response = await checkoutApi.sessions(payload);
    res.json(response);
  } catch (err: any) {
    res.status(err.statusCode).json({ error: err.message });
  }
});

export { router };
