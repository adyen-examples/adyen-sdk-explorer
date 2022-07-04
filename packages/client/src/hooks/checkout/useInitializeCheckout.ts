import { useEffect, useState } from 'react';
import type { RequestOptions } from '../types';

export const useInitializeCheckout = ({ payload, endpoint }: { payload: any; endpoint: string }) => {
  const [checkoutResponse, setCheckoutResponse] = useState<any>(null);

  useEffect(() => {
    const requestOptions: RequestOptions = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ payload: payload })
    };

    const initialize: () => void = async () => {
      try {
        const response = await fetch(`http://localhost:8080/${endpoint}`, requestOptions);
        const parsed = await response.json();
        setCheckoutResponse(parsed);
      } catch (e) {
        console.error('Error', e);
        setCheckoutResponse({error: { errorType: 'network', message: 'Network Error', status: '500', errorCode: '502' }});
      }
    };

    initialize();
  }, []);

  return [checkoutResponse];
};
