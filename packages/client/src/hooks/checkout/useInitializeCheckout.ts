import { useEffect, useState } from 'react';
import type { RequestOptions } from '../types';
import { API_URL, CLIENT_URL } from '../../config';

export const useInitializeCheckout = ({ payload, endpoint }: { payload: any; endpoint: string }) => {
  const [checkoutResponse, setCheckoutResponse] = useState<any>(null);
  const { profile, sessions } = payload;
  const serializedConfig = encodeURIComponent(JSON.stringify(payload));

  useEffect(() => {
    const requestOptions: RequestOptions = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ ...sessions, returnUrl: `${CLIENT_URL}/${profile.product}?config=${serializedConfig}` })
    };
    const initialize: () => void = async () => {
      try {
        const response = await fetch(`${API_URL}/${endpoint}`, requestOptions);
        const parsed = await response.json();
        setCheckoutResponse(parsed);
      } catch (e) {
        console.error('Error', e);
        setCheckoutResponse({ error: { errorType: 'network', message: 'Network Error', status: '500', errorCode: '502' } });
      }
    };

    initialize();
  }, []);

  return [checkoutResponse];
};
