import { Router, Request, Response } from 'express';

import { sessionsConfig, paymentMethodProperties } from '../../models';

// Adyen attributes
import { checkoutConfig, localConfig } from '../../temp';

type PaymentMethodProperties = { [key: string]: any };

const router = Router();

router.get('/', (req: Request, res: Response) => {
  try {
    return res.status(201).json({ checkoutConfig, localConfig, sessionsConfig });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/', (req: Request, res: Response) => {
  try {
    const paymentMethodProps: PaymentMethodProperties = paymentMethodProperties;
    const paymentMethods: PaymentMethodProperties = {};

    req.body.paymentMethods.forEach((pm: string) => {
      paymentMethods[pm] = paymentMethodProps[pm];
    });

    return res.status(201).json(paymentMethods);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

export { router };
