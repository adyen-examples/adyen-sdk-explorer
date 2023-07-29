import { Request, Response, Router } from 'express';
import { Client, CheckoutAPI, Management } from '@adyen/api-library';
import { ADYEN_API_KEY, ADYEN_MERCHANT_ACCOUNT } from '../../config';
import { checkoutProps, paymentMethodProps, sessionsProps } from '../../models';

import type { InitializationRequest, PaymentMethodProps, PaymentMethodPropsList } from './types';

const client = new Client({ apiKey: ADYEN_API_KEY, environment: 'TEST' });
const checkoutApi = new CheckoutAPI(client);
const management = new Management(client);

const router = Router();

router.get('/paymentMethods', async (req: Request, res: Response) => {
  try {
    const { paymentMethods } = await checkoutApi.paymentMethods({ merchantAccount: ADYEN_MERCHANT_ACCOUNT });

    const products: { [key: string]: any } = {
      'Drop-in': { txVariant: 'dropin' },
      ...paymentMethods?.reduce((acc, { name, type }) => {
        return name ? { ...acc, [name]: { txVariant: type } } : { ...acc };
      }, {})
    };
    return res.status(201).json(products);
  } catch (err: any) {
    res.status(err.statusCode).json({ error: err.message });
  }
});

router.get('/paymentMethods/:txvariant', async (req, res) => {
  try {
    const managePaymentMethodsList = await management.MerchantPaymentMethods.listPaymentMethodSettings(ADYEN_MERCHANT_ACCOUNT, {
      params: 'pageSize=100'
    });
    const local: PaymentMethodPropsList = paymentMethodProps;
    const componentConfig: PaymentMethodProps[] = local[req.params.txvariant];

    let countries: any = [],
      currencies: any = [],
      combinedSessionProps = [];

    let dynamicSessionProps: any = {
      amount: {
        description: 'The amount of the payment.',
        properties: [
          {
            description: 'The three-character [ISO currency code](https://docs.adyen.com/development-resources/currency-codes).',
            maxLength: 3,
            minLength: 3,
            type: 'string',
            name: 'currency'
          },
          {
            description: 'The amount of the transaction, in [minor units](https://docs.adyen.com/development-resources/currency-codes).',
            format: 'int64',
            type: 'integer',
            name: 'value'
          }
        ],
        name: 'amount',
        required: true,
        type: 'object'
      },
      merchantAccount: {
        description: 'The merchant account identifier, with which you want to process the transaction.',
        type: 'string',
        name: 'merchantAccount',
        required: true
      },
      countryCode: {
        description: "The shopper's two-letter country code.",
        type: 'string',
        name: 'countryCode'
      }
    };

    managePaymentMethodsList?.data?.forEach(({ PaymentMethod }: any) => {
      if (PaymentMethod.type == req.params.txvariant) {
        countries.push(...PaymentMethod.countries);
        currencies.push(...PaymentMethod.currencies);
      }
    });

    dynamicSessionProps.amount.properties[0].values = [...currencies];
    dynamicSessionProps.countryCode.values = [...countries];
    dynamicSessionProps.merchantAccount.values = ADYEN_MERCHANT_ACCOUNT;
    combinedSessionProps.push(dynamicSessionProps.amount);
    combinedSessionProps.push(dynamicSessionProps.merchantAccount);
    combinedSessionProps.push(dynamicSessionProps.countryCode);

    return res
      .status(201)
      .json({ checkoutConfig: checkoutProps, localConfig: componentConfig, sessionsConfig: [...combinedSessionProps, ...sessionsProps] });
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
