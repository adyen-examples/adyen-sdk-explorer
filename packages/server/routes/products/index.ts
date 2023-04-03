import { Router } from 'express';
import { getPaymentMethods } from './getPaymentMethods';
import { checkoutProps, paymentMethodProps, sessionsProps } from '../../models';

const router = Router();

export interface PaymentMethodProps {
  name: string;
  type?: string;
  description?: string;
  defaultValue?: any;
  [key: string]: any;
}

export interface PaymentMethodPropsList {
  [key: string]: PaymentMethodProps[];
}

router.get('/', async (req, res) => {
  try {
    const { paymentMethods }: { paymentMethods: PaymentMethodProps[] } = await getPaymentMethods();

    const products: { [key: string]: { txVariant: string } } = {
      'Drop-in': { txVariant: 'dropin' },
      ...paymentMethods.reduce((acc, { name, type }) => ({ ...acc, [name]: { txVariant: type } }), {})
    };
    return res.status(201).json({ ...products });
  } catch (err) {
    return res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/:txvariant', (req, res) => {
  try {
    const local: PaymentMethodPropsList = paymentMethodProps;
    const componentConfig: PaymentMethodProps[] = local[req.params.txvariant];

    return res.status(201).json({ checkoutConfig: checkoutProps, localConfig: componentConfig, sessionsConfig: sessionsProps });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

export { router };
