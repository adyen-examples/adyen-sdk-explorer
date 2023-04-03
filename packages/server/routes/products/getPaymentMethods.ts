import request from 'request-promise';
import { ADYEN_MERCHANT_ACCOUNT, ADYEN_API_KEY, ADYEN_BASE_URL } from '../../config';

export const getPaymentMethods = async () => {
  try {
    const options = {
      url: `${ADYEN_BASE_URL}/v70/paymentMethods`,
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'x-api-key': ADYEN_API_KEY
      },
      body: {
        merchantAccount: ADYEN_MERCHANT_ACCOUNT
      },
      json: true
    };

    return await request(options);
  } catch (err) {
    console.error(err);
  }
};
