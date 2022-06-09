import { Router, Request, Response } from 'express';
import request from 'request-promise';
import { ADYEN_API_KEY, ADYEN_BASE_URL, ADYEN_MERCHANT_ACCOUNT } from '../../config';
import type { InitializationRequest, RequestOptions } from './types';
import type { CheckoutSessionSetupResponse } from '@adyen/adyen-web/dist/types/types';

const router = Router();

router.post('/sessionStart', async (req: Request, res: Response) => { 
  const { payload }: InitializationRequest = req.body;
  
  try {
    const options: RequestOptions = {
      url: `${ADYEN_BASE_URL}/v68/sessions`,
      headers: {
        'Content-type': 'application/json',
        'x-api-key': ADYEN_API_KEY
      },
      body: {
        ...payload,
        merchantAccount: ADYEN_MERCHANT_ACCOUNT,
        returnUrl: 'http://test-merchant.com',
        reference: 'test-payment'
      },
      json: true,
      method:'POST'
    };
    
    const response: CheckoutSessionSetupResponse = await request(options);
    res.json(response);
  } catch (err: any) {
    console.log('error: ',err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export { router };
