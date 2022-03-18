import { Router } from 'express';
import request from 'request-promise';

import { errorHandler } from '../helpers';
import { ADYEN_API_KEY, ADYEN_BASE_URL } from '../../config';

import type { InitializationRequest, RequestOptions } from './types';
import type { CheckoutSessionSetupResponse } from '@adyen/adyen-web/dist/types/types';

const router = Router();

router.post('/sessionStart', async (req, res) => {
  const { version, apiKey, payload }: InitializationRequest = req.body;
  try {
    const options: RequestOptions = {
      url: `${ADYEN_BASE_URL}/${version}/sessions`,
      headers: {
        'Content-type': 'application/json',
        'x-api-key': apiKey || ADYEN_API_KEY
      },
      body: payload,
      json: true
    };

    const response: CheckoutSessionSetupResponse = await request(options);
    res.send(201).json(response);
  } catch (err) {
    errorHandler('/sessionStart', 500, err.message, res);
  }
});

export { router };
