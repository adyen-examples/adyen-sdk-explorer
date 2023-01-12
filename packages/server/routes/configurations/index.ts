import { Router } from 'express';
import { sessionsConfig } from '../../models';
import { checkoutConfig, localConfig } from '../../temp';

type PaymentMethodProperties = { [key: string]: any };

const router = Router();

router.get('/:txvariant', (req, res) => {
  try {
    const local: any = localConfig;
    const componentConfig: any = local[req.params.txvariant];

    return res.status(201).json({ checkoutConfig, localConfig: componentConfig, sessionsConfig });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

export { router };
