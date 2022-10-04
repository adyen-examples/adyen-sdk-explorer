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

router.get('/:paymentMethod', (req: Request, res: Response) => {
  try {
    const paymentMethodProps: PaymentMethodProperties = paymentMethodProperties;
    const paymentMethodToSend = paymentMethodProps[req.params.paymentMethod];
    return res.status(201).json(paymentMethodToSend);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

export { router };
