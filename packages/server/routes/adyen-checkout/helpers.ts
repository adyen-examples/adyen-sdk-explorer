import { PaymentMethod } from '@adyen/api-library/lib/src/typings/checkout/paymentMethod';
import { ADYEN_API_KEY, ADYEN_MERCHANT_ACCOUNT } from '../../config';

interface PaymentMethodDetails {
  PaymentMethod: {
    id: string;
    type: string;
    storeId?: string;
    enabled: boolean;
    countries: string[];
    currencies: string[];
    customRoutingFlags?: string[];
  };
}

export const getPaymentMethodIds = async () => {
  try {
    const response = await fetch(`https://management-test.adyen.com/v1/merchants/${ADYEN_MERCHANT_ACCOUNT}/paymentMethodSettings?pageSize=100`, {
      headers: {
        'Content-type': 'application/json',
        'X-Api-key': ADYEN_API_KEY
      }
    });

    const { data }: { data: [PaymentMethodDetails] } = await response.json();

    return data.reduce((acc, { PaymentMethod }) => {
      const { id, type, countries, currencies, storeId, enabled } = PaymentMethod;
      return storeId ? { ...acc } : { ...acc, [type]: { id, countries, currencies, enabled } };
    }, {});
  } catch (err: any) {
    console.error('ERROR GETTING PAYMENT METHOD IDs', err.message);
  }
};

export const combinePaymentMethodDetails = (paymentMethods: PaymentMethod[], details: { [key: string]: any }) => {
  return {
    'Drop-in': { txVariant: 'dropin' },
    ...paymentMethods.reduce((acc, { name, type }) => {
      if (!name || !type) {
        return { ...acc };
      }

      if (details[type]) {
        return { ...acc, [name]: { txVariant: type, ...details[type] } };
      }
      return { ...acc };
    }, {})
  };
};
