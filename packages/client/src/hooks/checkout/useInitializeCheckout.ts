import { useState, useEffect } from 'react';
import { useMemoCompare } from '../helpers/useMemoCompare';
import { compareFormData } from '../../helpers';
import type { InitializationRequest, RequestOptions } from '../types';

export const useInitializeCheckout = ({payload, endpoint}: {payload: any, endpoint:string}) => {
  const [checkoutResponse, setCheckoutResponse] = useState<any>(null);

  useEffect(() => {
    const requestOptions: RequestOptions = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({'payload': payload})
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
  }, []);

  return [checkoutResponse];
};
