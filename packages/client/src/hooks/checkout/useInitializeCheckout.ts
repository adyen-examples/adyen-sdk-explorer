import { useState, useEffect } from 'react';
import { useMemoCompare } from '../helpers/useMemoCompare';
import { compareFormData } from '../../helpers';
import type { InitializationRequest, RequestOptions } from '../types';

export const useInitializeCheckout = (options: InitializationRequest, component?: string, endpoint?: string) => {
  const [checkoutResponse, setCheckoutResponse] = useState<any>(null);

  // creates ref and uses data compare callback to decide if re-rendering should occur.  Without this, there is an infinite loop.
  const opts = useMemoCompare(options, compareFormData);

  useEffect(() => {
    const requestOptions: RequestOptions = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(options)
    };

    const initialize: () => void = async () => {
      try {
        const response = await fetch(`http://localhost:8080/${endpoint}`, requestOptions);

        const parsed = await response.json();
        setCheckoutResponse(parsed);
      } catch (err) {
        if (err && typeof err === 'object') {
          console.error('Error', err);
        } else {
          console.error('Something went wrong');
        }
      }
    };

    initialize();
  }, [opts, endpoint]);

  return [checkoutResponse];
};
