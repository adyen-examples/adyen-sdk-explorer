import { Router } from 'express';
import { checkoutProps, paymentMethodProps, sessionsProps } from '../../models';

const router = Router();

export interface PaymentMethodProps {
  name?: string;
  description?: string;
  type?: string;
  defaultValue?: any;
}

export interface PaymentMethodPropsList {
  [key: string]: PaymentMethodProps[];
}

router.get('/:txvariant', (req, res) => {
  try {
    const local: PaymentMethodPropsList = paymentMethodProps;
    const componentConfig: PaymentMethodProps[] = local[req.params.txvariant];

    return res.status(201).json({ checkoutProps, localConfig: componentConfig, sessionsProps });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

export { router };
