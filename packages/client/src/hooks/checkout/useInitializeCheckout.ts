import { useEffect, useState } from 'react';
import type { RequestOptions } from '../types';
import { API_URL, CLIENT_URL } from '../../config';

export const useInitializeCheckout = ({ payload, endpoint }: { payload: any; endpoint: string }) => {
  const [checkoutResponse, setCheckoutResponse] = useState<any>(null);
  const { profile, sessions } = payload;
  const serializedConfig =JSON.stringify(payload);

  useEffect(() => {
    console.log('Use effect on initializeCheckout');
    
    const requestOptions: RequestOptions = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ ...sessions, returnUrl: `${CLIENT_URL}/checkout-builder` })
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
